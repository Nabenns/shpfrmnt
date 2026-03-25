import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import authRouter from './auth'

const router = Router()

// Health check (public)
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth (public)
router.use('/auth', authRouter)

// Protected routes
// router.use('/shops', authenticate, shopsRouter)
// router.use('/orders', authenticate, ordersRouter)
// router.use('/products', authenticate, productsRouter)
// router.use('/chat', authenticate, chatRouter)
// router.use('/analytics', authenticate, analyticsRouter)
// router.use('/promotions', authenticate, promotionsRouter)
// router.use('/reviews', authenticate, reviewsRouter)
// router.use('/pricing', authenticate, pricingRouter)

// Placeholder untuk module yang belum dibuild
router.use('/shops', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/orders', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/products', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/chat', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/analytics', authenticate, (_req, res) => res.json({ data: {}, message: 'Coming soon' }))
router.use('/promotions', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/reviews', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))
router.use('/pricing', authenticate, (_req, res) => res.json({ data: [], message: 'Coming soon' }))

export default router
