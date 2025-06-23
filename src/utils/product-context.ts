// src/types/product-context.ts
import { Context, Request } from 'koa';
import { IProduct } from '../db/product.model';

export interface ProductContext extends Context {
  request: Request & { body: IProduct };
}
