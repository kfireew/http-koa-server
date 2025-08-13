import Router from 'koa-router';
import { ProductController } from '../controllers/product.controller';
import { validateProductMiddleware, validateIdMiddleware } from '../middlewares';
import { ProductContext } from '../utils';

export const router = new Router<any, ProductContext>({ prefix: '/products' });

router.get('/', ProductController.getProducts);
router.get('/:id', validateIdMiddleware, ProductController.getProductById);
router.post('/', validateProductMiddleware, ProductController.createProduct);
router.put(
  '/:id',
  validateIdMiddleware,
  validateProductMiddleware,
  ProductController.updateProduct
);
router.delete('/:id', validateIdMiddleware, ProductController.removeProduct);
