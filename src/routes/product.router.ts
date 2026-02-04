import Router from 'koa-router';
import { productController } from '../controllers/product.controller';
import { validateBodyMiddleware, validateIdMiddleware } from '../middlewares';
import { ProductContext, productSchema, productUpdateSchema } from '../utils';

export const router = new Router<any, ProductContext>({ prefix: '/products' });

router.get('/', productController.getProducts);
router.get('/:id', validateIdMiddleware, productController.getProductById);
router.post('/', validateBodyMiddleware(productSchema), productController.createProduct);
router.put(
  '/:id',
  validateIdMiddleware,
  validateBodyMiddleware(productUpdateSchema),
  productController.updateProduct
);
router.delete('/:id', validateIdMiddleware, productController.removeProduct);
