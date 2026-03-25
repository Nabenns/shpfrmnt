import { Router, Request, Response } from 'express'
import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { redis } from '../redis'
import { db } from '../db'

const router = Router()

const REFRESH_TTL = 60 * 60 * 24 * 7 // 7 hari
const ACCESS_TTL = '15m'

function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: ACCESS_TTL })
}

function generateRefreshToken(): string {
  return randomBytes(48).toString('hex')
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body ?? {}

  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username dan password diperlukan' })
    return
  }

  const { rows } = await db.query(
    'SELECT id, username, password_hash FROM users WHERE username = $1',
    [username]
  )

  const user = rows[0]
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    res.status(401).json({ success: false, message: 'Username atau password salah' })
    return
  }

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken()
  await redis.set(`refresh:${refreshToken}`, user.id, 'EX', REFRESH_TTL)

  res.json({
    success: true,
    accessToken,
    refreshToken,
    expiresIn: 900,
  })
})

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body ?? {}

  if (!refreshToken) {
    res.status(400).json({ success: false, message: 'Refresh token diperlukan' })
    return
  }

  const userId = await redis.get(`refresh:${refreshToken}`)
  if (!userId) {
    res.status(401).json({ success: false, message: 'Refresh token tidak valid atau expired' })
    return
  }

  await redis.del(`refresh:${refreshToken}`)
  const newRefreshToken = generateRefreshToken()
  await redis.set(`refresh:${newRefreshToken}`, userId, 'EX', REFRESH_TTL)

  res.json({
    success: true,
    accessToken: generateAccessToken(userId),
    refreshToken: newRefreshToken,
    expiresIn: 900,
  })
})

// POST /api/auth/logout
router.post('/logout', async (req: Request, res: Response) => {
  const { refreshToken } = req.body ?? {}
  if (refreshToken) await redis.del(`refresh:${refreshToken}`)
  res.json({ success: true })
})

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }

  try {
    const token = header.slice(7)
    const payload = jwt.verify(token, config.JWT_SECRET) as { userId: string }

    const { rows } = await db.query('SELECT username FROM users WHERE id = $1', [payload.userId])
    if (!rows[0]) {
      res.status(401).json({ success: false, message: 'User tidak ditemukan' })
      return
    }

    res.json({ success: true, userId: payload.userId, username: rows[0].username })
  } catch {
    res.status(401).json({ success: false, message: 'Token tidak valid' })
  }
})

export default router
