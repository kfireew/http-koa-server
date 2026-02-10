import { Context, Next } from 'koa';
import { ObjectSchema } from 'joi';
import { validateSchema } from '../utils';

export const validateBodyMiddleware =
  <T>(schema: ObjectSchema<T>) =>
  async (ctx: Context, next: Next) => {
    validateSchema(schema, ctx.request.body);
    await next();
  };
