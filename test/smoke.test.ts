import Fastify from 'fastify';

describe('Smoke Test', () => {
  it('should return status ok on /health', async () => {
    const app = Fastify();
    
    app.get('/health', async () => {
      return { status: 'ok' };
    });

    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});