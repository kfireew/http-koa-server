import { ProductEvents, ProductEventType, pubsub } from '../subscriptions';
import { Product, productRepository } from '../../db';
import { assertResultExists, logger } from '../../utils';

const getAllProducts = async (): Promise<Product[]> => {
  logger.info('Fetching all products');
  const products: Product[] = await productRepository.findAll();
  logger.info(`Fetched ${products.length} products`);
  return products;
};

const getProductById = async (_: unknown, { id }: { id: string }): Promise<Product> => {
  logger.info('Fetching product by id');
  const product: Product | null = await productRepository.findById(id);
  const result: Product = assertResultExists(product, 'Product');
  logger.info(`Fetched product ${result.name}`);
  return result;
};

const createProduct = async (_: unknown, { product }: { product: Product }): Promise<Product> => {
  logger.info('Creating new product');
  const createdProduct: Product = assertResultExists(
    await productRepository.createOne(product),
    'Product'
  );
  await publishProductChange(createdProduct, ProductEvents.CREATED);
  logger.info(`Created product ${createdProduct.name}`);
  return createdProduct;
};

const updateProduct = async (
  _: unknown,
  { id, data }: { id: string; data: Partial<Product> }
): Promise<Product> => {
  logger.info('Updating product by id');
  const updatedProduct: Product = assertResultExists(
    await productRepository.updateById({ id, data }),
    'Product'
  );
  await publishProductChange(updatedProduct, ProductEvents.UPDATED);
  logger.info(`Updated product ${updatedProduct.name}`);
  return updatedProduct;
};

const deleteProduct = async (_: unknown, { id }: { id: string }): Promise<boolean> => {
  logger.info('Removing product by id');
  const deletedProduct: Product = assertResultExists(
    await productRepository.deleteById(id),
    'Product'
  );
  await publishProductChange(deletedProduct, ProductEvents.DELETED);
  logger.info(`Deleted product ${deletedProduct.name}`);
  return !!deletedProduct;
};

const subscribeToProductsDelta = () =>
  pubsub.asyncIterableIterator([
    ProductEvents.CREATED,
    ProductEvents.UPDATED,
    ProductEvents.DELETED
  ]);

const publishProductChange = async <T>(changedProduct: T | null, event: ProductEventType) => {
  await pubsub.publish(event, {
    productsDelta: changedProduct
  });
};

export const productResolver = {
  Query: {
    products: getAllProducts,
    product: getProductById
  },

  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct
  },

  Subscription: {
    productsDelta: {
      subscribe: subscribeToProductsDelta
    }
  }
};
