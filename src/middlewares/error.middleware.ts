import { Context, Next } from 'koa';
import { logger } from '../utils';

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    logger.error(err);
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Internal server error' };
    ctx.app.emit('error', err, ctx);
  }
};
