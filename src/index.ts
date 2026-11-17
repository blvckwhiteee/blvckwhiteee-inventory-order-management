import Fastify from 'fastify';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { contextStorage, getTraceId } from './utils/context';
import { AppError } from './utils/AppError';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = Fastify({ logger: true });

app.addHook('onRequest', (request, reply, done) => {
  const traceId = (request.headers['x-trace-id'] as string) || randomUUID();
  contextStorage.run({ traceId }, () => {
    done();
  });
});

app.setErrorHandler((error, request, reply) => {
  const traceId = getTraceId();
  
  if (error instanceof AppError) {
    request.log.warn({ traceId, err: error }, 'Business Logic Error');
    return reply.status(error.statusCode).send({
      error: error.code,
      message: error.message,
      traceId
    });
  }

  request.log.error({ traceId, err: error }, 'Unhandled Internal Error');
  return reply.status(500).send({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
    traceId
  });
});

app.get('/health', async () => {
  return { status: 'ok', traceId: getTraceId() };
});

const start = async () => {
  try {
    await prisma.$queryRaw`SELECT now()`;
    app.log.info('Database connection established (Fail-fast check passed).');
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error('Failed to start server:');
    process.exit(1);
  }
};

start();