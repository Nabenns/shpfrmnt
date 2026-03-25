import Redis from 'ioredis'
import { config } from '../config'

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

redis.on('error', (err) => {
  console.error('Redis error:', err.message)
})

export async function checkRedisConnection(): Promise<void> {
  await redis.connect()
  await redis.ping()
  console.log('✅ Redis connected')
}
