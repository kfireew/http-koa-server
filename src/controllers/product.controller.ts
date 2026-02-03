import { logger, ProductContext } from '../utils';
import { productRepository } from '../db';

export class ProductController {
  async getProducts(ctx: ProductContext): Promise<void> {
    logger.info('Fetching all products');
    ctx.body = await productRepository.findAll();
  }

  async getProductById(ctx: ProductContext): Promise<void> {
    logger.info('Fetching product by id');
    ctx.body = (await productRepository.findById(ctx.params.id)) || ctx.throw(404, 'Not found');
  }

  async createProduct(ctx: ProductContext): Promise<void> {
    logger.info('Creating new product');
    ctx.status = 201;
    ctx.body = await productRepository.createOne(ctx.request.body);
  }

  async updateProduct(ctx: ProductContext): Promise<void> {
    logger.info('Updating product by id');
    ctx.body =
      (await productRepository.updateById({ id: ctx.params.id, data: ctx.request.body })) ||
      ctx.throw(404, 'Not found');
  }

  async removeProduct(ctx: ProductContext): Promise<void> {
    logger.info('Removing product by id');
    ctx.body = (await productRepository.deleteById(ctx.params.id)) || ctx.throw(404, 'Not found');
    ctx.status = 204;
  }
}

export const productController = new ProductController();
