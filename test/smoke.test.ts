import { buildApp } from '../src/app';

describe('Smoke Test', () => {
  it('should return status ok on /health', async () => {
    const app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('status', 'ok');
  });
});