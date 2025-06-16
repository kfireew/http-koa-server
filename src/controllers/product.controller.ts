import { Context } from 'koa';
import * as dal from '../db/product.dal';
import { getRequestBodyProduct } from '../utils/validate-product';

export const getAll = async (ctx: Context) => {
  ctx.body = await dal.findAll();
};

export const getById = async (ctx: Context) => {
  const product = await dal.findById(ctx.params.id);
  if (!product) {
    ctx.throw(404, 'Product not found');
  }
  ctx.body = product;
};

export const create = async (ctx: Context) => {
  ctx.status = 201;
  ctx.body = await dal.createOne(getRequestBodyProduct(ctx));
};

export const update = async (ctx: Context) => {
  const updated = await dal.updateById(ctx.params.id, getRequestBodyProduct(ctx));
  if (!updated) ctx.throw(404, 'Product not found');
  ctx.body = updated;
};

export const remove = async (ctx: Context) => {
  const deleted = await dal.deleteById(ctx.params.id);
  if (!deleted) ctx.throw(404, 'Product not found');
  ctx.status = 204;
};
