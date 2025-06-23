import Router from 'koa-router';
import * as ctrl from '../controllers/product.controller';
import { validateProduct } from '../middlewares/validateProduct';
import { ProductContext } from '../utils/product-context';

const router = new Router<any, ProductContext>({ prefix: '/products' });

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validateProduct, ctrl.create);
router.put('/:id', validateProduct, ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
