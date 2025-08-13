import { Context, Next } from 'koa';
import mongoose from 'mongoose';

export const validateIdMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid ID format'
    };
    return;
  }

  ctx.productId = id;
  await next();
};
