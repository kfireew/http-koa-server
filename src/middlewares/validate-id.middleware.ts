import { Context, Next } from 'koa';
import mongoose from 'mongoose';
import { BadRequestError } from '../utils';

export const validateIdMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('Invalid ID format');
  }

  await next();
};
