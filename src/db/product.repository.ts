import { ProductModel, Product } from './product.model';
import { assertResultExists, logger } from '../utils';

export class ProductRepository {
  findAll = async (): Promise<Product[]> => {
    logger.info('Fetching all products');
    const products: Product[] = await ProductModel.find();
    logger.info(`Fetched ${products.length} products`);

    return products;
  };

  findById = async (id: string): Promise<Product> => {
    logger.info('Fetching product by id');
    const product: Product = assertResultExists(await ProductModel.findById(id), 'Product');
    logger.info(`Fetched product ${product.name}`);
    return product;
  };

  createOne = async (data: Partial<Product>): Promise<Product> => {
    logger.info('Creating new product');
    const createdProduct: Product = await productRepository.createOne(data);
    logger.info(`Created product ${createdProduct.name}`);
    return new ProductModel(data).save();
  };

  updateById = async ({ id, data }: { id: string; data: Partial<Product> }): Promise<Product> => {
    logger.info('Updating product by id');
    const updatedProduct: Product | null = assertResultExists(
      await productRepository.updateById({
        id,
        data
      }),
      'Product'
    );
    logger.info(`Updated product ${updatedProduct?.name}`);
    return updatedProduct;
  };

  deleteById = async (id: string): Promise<Product | null> => {
    logger.info('Removing product by id');
    const deletedProduct: Product = assertResultExists(
      await productRepository.deleteById(id),
      'Product'
    );
    logger.info(`Deleted product ${deletedProduct.name}`);
    return ProductModel.findByIdAndDelete(id);
  };
}

export const productRepository = new ProductRepository();
