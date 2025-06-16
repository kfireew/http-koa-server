import Router from 'koa-router';
import * as ctrl from '../controllers/product.controller';

const router = new Router({ prefix: '/products' });

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
