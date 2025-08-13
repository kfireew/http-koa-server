import { Context, Next } from 'koa';
import { logger } from '../utils';

export const loggerMiddleware = async (ctx: Context, next: Next) => {
  const start = Date.now();
  logger.info(`Started handling request: ${ctx.method} ${ctx.url}`);
  await next();
  const ms = Date.now() - start;
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
};
