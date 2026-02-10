import { assertResultExists, logger, ProductContext } from '../utils';
import { Product, productRepository } from '../db';

export class ProductController {
  getProducts = async (ctx: ProductContext): Promise<void> => {
    logger.info('Fetching all products');
    const products: Product[] = await productRepository.findAll();
    logger.info(`Fetched ${products.length} products`);
    ctx.body = products;
  };

  getProductById = async (ctx: ProductContext): Promise<void> => {
    logger.info('Fetching product by id');
    const product: Product = assertResultExists(
      await productRepository.findById(ctx.params.id),
      'Product'
    );
    logger.info(`Fetched product ${product.name}`);
    ctx.body = product;
  };

  createProduct = async (ctx: ProductContext): Promise<void> => {
    logger.info('Creating new product');
    const createdProduct: Product = await productRepository.createOne(ctx.request.body);
    logger.info(`Created product ${createdProduct.name}`);
    ctx.status = 201;
    ctx.body = createdProduct;
  };

  updateProduct = async (ctx: ProductContext): Promise<void> => {
    logger.info('Updating product by id');
    const updatedProduct: Product | null = await productRepository.updateById({
      id: ctx.params.id,
      data: ctx.request.body
    });
    logger.info(`Updated product ${updatedProduct?.name}`);
    ctx.body = assertResultExists(updatedProduct, 'Product');
  };

  removeProduct = async (ctx: ProductContext): Promise<void> => {
    logger.info('Removing product by id');
    const deletedProduct: Product | null = await productRepository.deleteById(ctx.params.id);
    logger.info(`Deleted product ${deletedProduct?.name}`);
    ctx.status = 204;
    ctx.body = !!assertResultExists(deletedProduct, 'Product');
  };
}

export const productController = new ProductController();
