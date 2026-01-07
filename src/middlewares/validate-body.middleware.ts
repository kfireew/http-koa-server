import { Context, Next } from 'koa';
import { validateSchema } from '../utils';
import { ObjectSchema } from 'joi';

export const validateBodyMiddleware =
  <T>(schema: ObjectSchema<T>) =>
  async (ctx: Context, next: Next) => {
    validateSchema(schema, ctx.request.body);
    await next();
  };
