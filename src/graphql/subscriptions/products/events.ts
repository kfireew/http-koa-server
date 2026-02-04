export const ProductEvents = {
  CREATED: 'PRODUCT_CREATED',
  UPDATED: 'PRODUCT_UPDATED',
  DELETED: 'PRODUCT_DELETED'
} as const;

export type ProductEventType = (typeof ProductEvents)[keyof typeof ProductEvents];
