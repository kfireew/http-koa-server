import { productSchema } from './products.schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

export const schemas = mergeTypeDefs([productSchema]);
