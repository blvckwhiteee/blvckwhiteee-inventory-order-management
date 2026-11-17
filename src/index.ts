import Fastify from 'fastify';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = Fastify({ logger: true });

app.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await prisma.$queryRaw`SELECT now()`;
    app.log.info('Database connection established (Fail-fast check passed).');

    await app.listen({ port: 3000 });
  } catch (err) {
  if (err instanceof Error) {
    console.error("Failed to start server:", err.message);
  } else {
    console.error("Failed to start server:", err);
  }
}
}
start();