import { Context, Next } from 'koa';
import { logger, AppError } from '../utils';
import { isDetailedError } from '../utils/errors';

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof AppError) {
      logger.error(`${err.name}: ${err.message}`);
      ctx.status = err.statusCode;
      ctx.body = {
        error: err.name,
        message: err.message,
        ...(isDetailedError(err) && {
          details: err.details
        })
      };
      ctx.app.emit('error', err, ctx);
    } else if (err instanceof Error) {
      logger.error(err.message || 'Internal server error');
      ctx.status = 500;
      ctx.body = {
        error: 'InternalServerError',
        message: err.message || 'Internal server error'
      };
      ctx.app.emit('error', err, ctx);
    } else {
      logger.error('Unknown error occurred');
      ctx.status = 500;
      ctx.body = {
        error: 'InternalServerError',
        message: 'Unknown error occurred'
      };
      ctx.app.emit('error', new Error('Unknown error'), ctx);
    }
  }
};
