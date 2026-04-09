import { ProductContext } from '../utils';
import { Product, productRepository } from '../db';

export class ProductController {
  getProducts = async (ctx: ProductContext): Promise<void> => {
    ctx.body = await productRepository.findAll();
  };

  getProductById = async (ctx: ProductContext): Promise<void> => {
    ctx.body = await productRepository.findById(ctx.params.id);
  };

  createProduct = async (ctx: ProductContext): Promise<void> => {
    const createdProduct: Product = await productRepository.createOne(ctx.request.body);
    ctx.status = 201;
    ctx.body = createdProduct;
  };

  updateProduct = async (ctx: ProductContext): Promise<void> => {
    ctx.body = await productRepository.updateById({
      id: ctx.params.id,
      data: ctx.request.body
    });
  };

  removeProduct = async (ctx: ProductContext): Promise<void> => {
    const deletedProduct: Product | null = await productRepository.deleteById(ctx.params.id);
    ctx.status = 204;
    ctx.body = !!deletedProduct;
  };
}

export const productController = new ProductController();
