import { ProductContext } from '../utils/product-context';
import * as dal from '../db/product.dal';
import { logger } from '../utils/logger';

export const getAll = async (ctx: ProductContext) => {
  logger.debug('Fetching all products');
  ctx.body = await dal.findAll();
};

export const getById = async (ctx: ProductContext) => {
  logger.debug('Fetching product by id');
  const product = await dal.findById(ctx.params.id);
  if (!product) {
    ctx.throw(404, 'Product not found');
  }
  ctx.body = product;
};

export const create = async (ctx: ProductContext) => {
  logger.debug('Creating new product');
  ctx.status = 201;
  ctx.body = await dal.createOne(ctx.request.body);
};

export const update = async (ctx: ProductContext) => {
  logger.debug('Updating product by id');
  const updated = await dal.updateById(ctx.params.id, ctx.request.body);
  if (!updated) ctx.throw(404, 'Product not found');
  ctx.body = updated;
};

export const remove = async (ctx: ProductContext) => {
  logger.debug('Updating product by id');
  const deleted = await dal.deleteById(ctx.params.id);
  if (!deleted) ctx.throw(404, 'Product not found');
  ctx.status = 204;
};
