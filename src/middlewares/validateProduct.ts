import { Context, Next } from 'koa';
import { productSchema } from '../utils/validation';

export const validateProduct = async (ctx: Context, next: Next) => {
  console.log(ctx.request.body);
  const { error, value } = productSchema.validate(ctx.request.body, { abortEarly: false });
  if (error) {
    ctx.status = 400;
    ctx.body = {
      message: 'Validation Error',
      details: error.details.map((d) => d.message),
    };
    return;
  }
  ctx.request.body = value;
  await next();
};
