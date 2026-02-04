import { Context, Next } from 'koa';
import { ObjectSchema } from 'joi';
import { validateRequestBody } from '../utils/validators';

export const validateBodyMiddleware =
  <T>(schema: ObjectSchema<T>) =>
  async (ctx: Context, next: Next) => {
    validateRequestBody(schema, ctx.request.body);
    await next();
  };
