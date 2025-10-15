import { logger, ProductContext } from '../utils';
import { ProductRepository } from '../db';

export class ProductController {
  public static async getProducts(ctx: ProductContext): Promise<void> {
    logger.info('Fetching all products');
    ctx.body = await ProductRepository.findAll();
  }

  public static async getProductById(ctx: ProductContext): Promise<void> {
    logger.info('Fetching product by id');
    ctx.body = await ProductRepository.findById(ctx);
  }

  public static async createProduct(ctx: ProductContext): Promise<void> {
    logger.info('Creating new product');
    ctx.status = 201;
    ctx.body = await ProductRepository.createOne(ctx.request.body);
  }

  public static async updateProduct(ctx: ProductContext): Promise<void> {
    logger.info('Updating product by id');
    ctx.body = await ProductRepository.updateById(ctx);
  }

  public static async removeProduct(ctx: ProductContext): Promise<void> {
    logger.info('Removing product by id');
    await ProductRepository.deleteById(ctx);
    ctx.status = 204;
  }
}
