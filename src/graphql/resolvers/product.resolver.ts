import { PRODUCT_EVENTS, ProductEventType } from '../subscriptions';
import { pubsub } from '../subscriptions';
import { Product, productRepository } from '../../db';
import { assertResultExists, logger } from '../../utils';

const getAllProducts = async (): Promise<Product[]> => {
  logger.info('Fetching all products');
  return await productRepository.findAll();
};

const getProductById = async (_: unknown, { id }: { id: string }): Promise<Product> => {
  logger.info('Fetching product by id');
  const product = await productRepository.findById(id);
  return assertResultExists(product);
};

const createProduct = async (_: unknown, { product }: { product: Product }): Promise<Product> => {
  logger.info('Creating new product');
  const createdProduct: Product = await productRepository.createOne(product);
  return publishProductChange(createdProduct, PRODUCT_EVENTS.CREATED);
};

const updateProduct = async (
  _: unknown,
  { id, data }: { id: string; data: Partial<Product> }
): Promise<Product> => {
  logger.info('Updating product by id');
  const updatedProduct: Product | null = await productRepository.updateById({ id, data });
  return publishProductChange(updatedProduct, PRODUCT_EVENTS.UPDATED);
};

const deleteProduct = async (_: unknown, { id }: { id: string }): Promise<boolean> => {
  logger.info('Removing product by id');
  const deletedProduct: Product | null = await productRepository.deleteById(id);
  return !!(await publishProductChange(deletedProduct, PRODUCT_EVENTS.DELETED));
};

const subscribeToProductsDelta = () =>
  pubsub.asyncIterableIterator([
    PRODUCT_EVENTS.CREATED,
    PRODUCT_EVENTS.UPDATED,
    PRODUCT_EVENTS.DELETED
  ]);

const publishProductChange = async <T>(
  changedProduct: T | null,
  event: ProductEventType
): Promise<T> => {
  const validProduct: T = assertResultExists(changedProduct);

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
