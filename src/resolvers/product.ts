import { PRODUCT_EVENTS, pubsub } from '../utils/pubsub';
import { Product, ProductRepository } from '../db';
import { logger } from '../utils';

export const productResolver = {
  Query: {
    products: async (): Promise<Product[]> => {
      logger.info('Fetching all products');
      return await ProductRepository.findAll();
    },
    product: async (_: any, { id }: { id: string }): Promise<Product> => {
      logger.info('Fetching product by id');
      return await ProductRepository.findByIdGQL(id);
    }
  },

  Mutation: {
    createProduct: async (_: any, { product }: { product: Product }): Promise<Product> => {
      logger.info('Creating new product');
      return handleProductChange(ProductRepository.createOne, product, PRODUCT_EVENTS.CREATED);
    },

    updateProduct: async (
      _: any,
      { id, data }: { id: string; data: Partial<Product> }
    ): Promise<Product> => {
      logger.info('Updating product by id');
      return handleProductChange(
        ProductRepository.updateByIdGQL,
        { id, data },
        PRODUCT_EVENTS.UPDATED
      );
    },

    deleteProduct: async (_: any, { id }: { id: string }): Promise<boolean> => {
      logger.info('Removing product by id');
      return !!(await handleProductChange(
        ProductRepository.deleteByIdGQL,
        id,
        PRODUCT_EVENTS.DELETED
      ));
    }
  },

  Subscription: {
    productsDelta: {
      subscribe: () =>
        pubsub.asyncIterableIterator([
          PRODUCT_EVENTS.CREATED,
          PRODUCT_EVENTS.UPDATED,
          PRODUCT_EVENTS.DELETED
        ])
    }
  }
};

const handleProductChange = async <TArgs, TResult>(
  repoFn: (args: TArgs) => Promise<TResult>,
  args: TArgs,
  event: PRODUCT_EVENTS
): Promise<TResult> => {
  const changedProduct: TResult = await repoFn(args);

  await pubsub.publish(event, {
    productsDelta: changedProduct
  });

  return changedProduct;
};
