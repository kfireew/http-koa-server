import { Context, Next } from 'koa';
import mongoose from 'mongoose';

export const validateIdMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
};
