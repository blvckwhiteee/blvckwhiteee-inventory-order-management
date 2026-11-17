import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { buildApp } from './app';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ЄДИНЕ оголошення app
const app = buildApp();

const start = async () => {
  try {
    await prisma.$queryRaw`SELECT now()`;
    app.log.info('Database connection established (Fail-fast check passed).');
    
    await app.listen({ port: 3000 });
  }  catch (err) {
    app.log.error({ err }, 'Failed to start server');
    process.exit(1);
  }
};

start();