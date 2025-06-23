import { Context, Next } from 'koa';
import { logger } from '../utils/logger';

export const requestLogger = async (ctx: Context, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
};
