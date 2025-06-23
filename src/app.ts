import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import productRoutes from './routes/product.router';
import { errorHandler } from './middlewares/error-handler';
import { requestLogger } from './middlewares/requestLogger';

const app = new Koa();

app.use(bodyParser());

app.use(errorHandler);

app.use(requestLogger);

// Mount routes
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

export default app;
