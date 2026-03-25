import { readFileSync } from 'fs'
import { join } from 'path'
import { db } from './index'

async function migrate() {
  console.log('🔄 Running database migrations...')

  const sql = readFileSync(
    join(__dirname, 'migrations', '001_initial_schema.sql'),
    'utf-8'
  )

  try {
    await db.query(sql)
    console.log('✅ Migration completed successfully')
  } catch (err) {
    console.error('❌ Migration failed:', err)
    process.exit(1)
  } finally {
    await db.end()
  }
}

migrate()
