import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import productRoutes from './routes/product.router';
import { errorHandler } from './middlewares/error-handler';

const app = new Koa();

// Global error handling
app.use(errorHandler);

// Body parser
app.use(bodyParser());

// Mount routes
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

export default app;
