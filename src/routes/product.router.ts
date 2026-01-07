import Router from 'koa-router';
import { ProductController } from '../controllers/product.controller';
import { validateBodyMiddleware, validateIdMiddleware } from '../middlewares';
import { ProductContext, productSchema, productUpdateSchema } from '../utils';

export const router = new Router<any, ProductContext>({ prefix: '/products' });

router.get('/', ProductController.getProducts);
router.get('/:id', validateIdMiddleware, ProductController.getProductById);
router.post('/', validateBodyMiddleware(productSchema), ProductController.createProduct);
router.put(
  '/:id',
  validateIdMiddleware,
  validateBodyMiddleware(productUpdateSchema),
  ProductController.updateProduct
);
router.delete('/:id', validateIdMiddleware, ProductController.removeProduct);
