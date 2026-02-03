import Router from 'koa-router';
import { productController } from '../controllers/product.controller';
import { validateBodyMiddleware, validateIdMiddleware } from '../middlewares';
import { ProductContext, productSchema, productUpdateSchema } from '../utils';

export const router = new Router<any, ProductContext>({ prefix: '/products' });

router.get('/', productController.getProducts.bind(productController));
router.get('/:id', validateIdMiddleware, productController.getProductById.bind(productController));
router.post(
  '/',
  validateBodyMiddleware(productSchema),
  productController.createProduct.bind(productController)
);
router.put(
  '/:id',
  validateIdMiddleware,
  validateBodyMiddleware(productUpdateSchema),
  productController.updateProduct.bind(productController)
);
router.delete(
  '/:id',
  validateIdMiddleware,
  productController.removeProduct.bind(productController)
);
