import { Context, Next } from 'koa';
import mongoose from 'mongoose';
import { errorsFactory } from '../utils/errors';

export const validateIdMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw errorsFactory.badRequest('Invalid ID format');
  }

  await next();
};
