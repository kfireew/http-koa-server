import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './routes/product.router';
import { errorMiddleware, loggerMiddleware } from './middlewares';

export const app = new Koa();

app.use(bodyParser());

app.use(errorMiddleware);

app.use(loggerMiddleware);

app.use(router.routes()).use(router.allowedMethods());
