import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config({ path: '../database/.env' }); // Adjust if you moved .env to root, but this will work if run from backend

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
