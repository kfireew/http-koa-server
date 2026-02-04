import { ProductEvents, ProductEventType } from '../subscriptions';
import { pubsub } from '../subscriptions';
import { Product, productRepository } from '../../db';
import { logger } from '../../utils';
import { assertResultExists } from '../../utils/validators';

const getAllProducts = async (): Promise<Product[]> => {
  logger.info('Fetching all products');
  const products: Product[] = await productRepository.findAll();
  logger.info(`Fetched ${products.length} products`);
  return products;
};

const getProductById = async (_: unknown, { id }: { id: string }): Promise<Product> => {
  logger.info('Fetching product by id');
  const product: Product | null = await productRepository.findById(id);
  return assertResultExists(product, 'Product');
};

const createProduct = async (_: unknown, { product }: { product: Product }): Promise<Product> => {
  logger.info('Creating new product');
  const createdProduct: Product = await productRepository.createOne(product);
  return publishProductChange(createdProduct, ProductEvents.CREATED);
};

const updateProduct = async (
  _: unknown,
  { id, data }: { id: string; data: Partial<Product> }
): Promise<Product> => {
  logger.info('Updating product by id');
  const updatedProduct: Product | null = await productRepository.updateById({ id, data });
  return publishProductChange(updatedProduct, ProductEvents.UPDATED);
};

const deleteProduct = async (_: unknown, { id }: { id: string }): Promise<boolean> => {
  logger.info('Removing product by id');
  const deletedProduct: Product | null = await productRepository.deleteById(id);
  return !!(await publishProductChange(deletedProduct, ProductEvents.DELETED));
};

const subscribeToProductsDelta = () =>
  pubsub.asyncIterableIterator([
    ProductEvents.CREATED,
    ProductEvents.UPDATED,
    ProductEvents.DELETED
  ]);

const publishProductChange = async <T>(
  changedProduct: T | null,
  event: ProductEventType
): Promise<T> => {
  const validProduct: T = assertResultExists(changedProduct, 'Product');

  await pubsub.publish(event, {
    productsDelta: validProduct
  });

  return validProduct;
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
