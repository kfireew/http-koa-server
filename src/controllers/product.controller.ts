import { ProductContext, logger } from '../utils';
import { ProductService } from '../db';

export class ProductController {
  public static async getProducts(ctx: ProductContext): Promise<void> {
    logger.debug('Fetching all products');
    ctx.body = await ProductService.findAll();
  }

  public static async getProductById(ctx: ProductContext): Promise<void> {
    logger.debug('Fetching product by id');
    const product = await ProductService.findById(ctx.params.id);
    if (!product) {
      ctx.throw(404, 'Product not found');
    }
    ctx.body = product;
  }

  public static async createProduct(ctx: ProductContext): Promise<void> {
    logger.debug('Creating new product');
    ctx.status = 201;
    ctx.body = await ProductService.createOne(ctx.request.body);
  }

  public static async updateProduct(ctx: ProductContext): Promise<void> {
    logger.debug('Updating product by id');
    const updated = await ProductService.updateById(ctx.params.id, ctx.request.body);
    if (!updated) ctx.throw(404, 'Product not found');
    ctx.body = updated;
  }

  public static async removeProduct(ctx: ProductContext): Promise<void> {
    logger.debug('Removing product by id');
    const deleted = await ProductService.deleteById(ctx.params.id);
    if (!deleted) ctx.throw(404, 'Product not found');
    ctx.status = 204;
  }
}
