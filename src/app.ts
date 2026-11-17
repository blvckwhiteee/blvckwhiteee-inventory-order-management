import Fastify from 'fastify';
import { contextStorage, getTraceId } from './utils/context';
import { randomUUID } from 'node:crypto';

export const buildApp = () => {
  const app = Fastify({ logger: true });

  app.addHook('onRequest', (request, reply, done) => {
    const traceId = (request.headers['x-trace-id'] as string) || randomUUID();
    contextStorage.run({ traceId }, () => done());
  });

  app.get('/health', async () => ({ status: 'ok', traceId: getTraceId() }));

  return app;
};