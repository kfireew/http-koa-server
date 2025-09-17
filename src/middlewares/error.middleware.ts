import { Context, Next } from 'koa';
import { logger } from '../utils';

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message || 'Internal server error');
      ctx.body = { message: err.message || 'Internal server error' };
      ctx.app.emit('error', err, ctx);
    }
  }
};
