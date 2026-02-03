import { PubSub } from 'graphql-subscriptions';

export const pubsub: PubSub = new PubSub();
export enum PRODUCT_EVENTS {
  CREATED = 'PRODUCT_CREATED',
  UPDATED = 'PRODUCT_UPDATED',
  DELETED = 'PRODUCT_DELETED'
}
