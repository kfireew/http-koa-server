export const PRODUCT_EVENTS = {
  CREATED: 'PRODUCT_CREATED',
  UPDATED: 'PRODUCT_UPDATED',
  DELETED: 'PRODUCT_DELETED'
} as const;

export type ProductEventType = (typeof PRODUCT_EVENTS)[keyof typeof PRODUCT_EVENTS];
