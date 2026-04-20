import { Context, Next } from 'koa';
import { logger } from '../utils';
import { isAppError } from '../utils/errors';

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (isAppError(err)) {
      logger.error(`${err.name}: ${err.message}`);
      ctx.status = err.status;
      ctx.body = {
        error: err.name,
        message: err.message
      };
    } else {
      logger.error('Unknown error occurred');
      ctx.status = 500;
      ctx.body = {
        error: 'InternalServerError',
        message: 'Unknown error occurred'
      };
    }
  }
};
