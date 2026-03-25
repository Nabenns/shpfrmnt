import bcrypt from 'bcryptjs'
import { db } from './index'
import { config } from '../config'

async function seed() {
  console.log('🌱 Seeding database...')

  const hash = await bcrypt.hash(config.ADMIN_PASSWORD, 12)

  await db.query(`
    INSERT INTO users (username, password_hash)
    VALUES ($1, $2)
    ON CONFLICT (username) DO UPDATE SET password_hash = $2
  `, [config.ADMIN_USERNAME, hash])

  console.log(`✅ Admin user "${config.ADMIN_USERNAME}" created/updated`)
  await db.end()
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
