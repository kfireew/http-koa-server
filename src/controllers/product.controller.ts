import { ProductContext, logger, assertFound } from '../utils';
import { ProductService } from '../db';

export class ProductController {
  public static async getProducts(ctx: ProductContext): Promise<void> {
    logger.info('Fetching all products');
    ctx.body = await ProductService.findAll();
  }

  public static async getProductById(ctx: ProductContext): Promise<void> {
    logger.info('Fetching product by id');
    const product = await ProductService.findById(ctx.params.id);
    assertFound(product, ctx);
    ctx.body = product;
  }

  public static async createProduct(ctx: ProductContext): Promise<void> {
    logger.info('Creating new product');
    ctx.status = 201;
    ctx.body = await ProductService.createOne(ctx.request.body);
  }

  public static async updateProduct(ctx: ProductContext): Promise<void> {
    logger.info('Updating product by id');
    const updated = await ProductService.updateById(ctx.params.id, ctx.request.body);
    assertFound(updated, ctx);
    ctx.body = updated;
  }

  public static async removeProduct(ctx: ProductContext): Promise<void> {
    logger.info('Removing product by id');
    const deleted = await ProductService.deleteById(ctx.params.id);
    assertFound(deleted, ctx);
    ctx.status = 204;
  }
}
