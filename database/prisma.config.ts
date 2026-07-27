import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' }) // Load the root .env that we created earlier
export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://localhost/studzens',
  },
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts',
  },
})

