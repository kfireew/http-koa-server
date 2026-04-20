import { ProductEvents, ProductEvent, pubsub } from '../subscriptions';
import { Product, productRepository } from '../../db';

const getAllProducts = async (): Promise<Product[]> => {
  return await productRepository.findAll();
};

const getProductById = async (_: unknown, { id }: { id: string }): Promise<Product> => {
  return await productRepository.findById(id);
};

const createProduct = async (_: unknown, { product }: { product: Product }): Promise<Product> => {
  const createdProduct: Product = await productRepository.createOne(product);
  await publishProductChange(createdProduct, ProductEvents.CREATED);
  return createdProduct;
};

const updateProduct = async (
  _: unknown,
  { id, data }: { id: string; data: Partial<Product> }
): Promise<Product> => {
  const updatedProduct: Product = await productRepository.updateById({ id, data });
  await publishProductChange(updatedProduct, ProductEvents.UPDATED);
  return updatedProduct;
};

const deleteProduct = async (_: unknown, { id }: { id: string }): Promise<boolean> => {
  return !!(await productRepository.deleteById(id));
};

const subscribeToProductsDelta = () =>
  pubsub.asyncIterableIterator([
    ProductEvents.CREATED,
    ProductEvents.UPDATED,
    ProductEvents.DELETED
  ]);

const publishProductChange = async <T>(changedProduct: T | null, event: ProductEvent) => {
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
