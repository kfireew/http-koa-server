import Router from 'koa-router';
import { productController } from '../controllers/product.controller';
import { validateBodyMiddleware, validateIdMiddleware } from '../middlewares';
import { ProductContext, productSchema, productUpdateSchema } from '../utils';

export const productRouter = new Router<any, ProductContext>({ prefix: '/products' });

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', validateIdMiddleware, productController.getProductById);
productRouter.post('/', validateBodyMiddleware(productSchema), productController.createProduct);
productRouter.put(
  '/:id',
  validateIdMiddleware,
  validateBodyMiddleware(productUpdateSchema),
  productController.updateProduct
);
productRouter.delete('/:id', validateIdMiddleware, productController.removeProduct);
