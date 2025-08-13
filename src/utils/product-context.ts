import { Context, Request } from 'koa';
import { Product } from '../db';

export interface ProductContext extends Context {
  request: Request & { body: Product };
}
