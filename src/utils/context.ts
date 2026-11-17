import { AsyncLocalStorage } from 'node:async_hooks';

interface AppContext {
  traceId: string;
}

export const contextStorage = new AsyncLocalStorage<AppContext>();

export const getTraceId = (): string => {
  const store = contextStorage.getStore();
  return store?.traceId || 'no-trace-id';
};