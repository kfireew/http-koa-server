import { IProduct } from '../db/product.model';
import { Context } from 'koa';

export const validateProduct = (body: any): body is IProduct => {
  return (
    typeof body !== 'object' ||
    typeof body.name !== 'string' ||
    typeof body.price !== 'number' ||
    (body.description !== undefined && typeof body.description !== 'string')
  );
};

export const getRequestBodyProduct = (ctx: Context): IProduct => {
  return !validateProduct(ctx.request.body)
    ? ctx.throw(400, 'Invalid product payload')
    : ctx.request.body;
};
