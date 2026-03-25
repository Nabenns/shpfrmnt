import { Pool } from 'pg'
import { config } from '../config'

export const db = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

db.on('error', (err) => {
  console.error('Unexpected DB pool error', err)
})

export async function checkDbConnection(): Promise<void> {
  const client = await db.connect()
  await client.query('SELECT 1')
  client.release()
  console.log('✅ PostgreSQL connected')
}
