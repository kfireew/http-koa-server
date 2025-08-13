import { Context, Next } from 'koa';
import { validateSchema, productSchema, productUpdateSchema } from '../utils';
import { ObjectSchema } from 'joi';
import { Product } from '../db';

export const validateProductMiddleware = async (ctx: Context, next: Next) => {
  try {
    const schema: ObjectSchema<Partial<Product>> =
      ctx.method === 'PUT' ? productUpdateSchema : productSchema;
    validateSchema(schema, ctx.request.body);
    await next();
  } catch (error: any) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message,
      details: error.details
    };
    return;
  }
};
