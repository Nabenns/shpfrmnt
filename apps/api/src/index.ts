import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from './config'
import { checkDbConnection } from './db'
import { checkRedisConnection } from './redis'
import router from './routes'
import { errorHandler, notFound } from './middleware/errorHandler'

const app = express()

// Security
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.NEXTAUTH_URL
    : 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', router)

// Error handling
app.use(notFound)
app.use(errorHandler)

async function start() {
  try {
    await checkDbConnection()
    await checkRedisConnection()

    const port = parseInt(config.API_PORT, 10)
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 API running on http://0.0.0.0:${port}`)
      console.log(`   ENV: ${config.NODE_ENV}`)
    })
  } catch (err) {
    console.error('Failed to start API:', err)
    process.exit(1)
  }
}

start()
