import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { productRouter } from './routes/product.router';
import { errorMiddleware, loggerMiddleware } from './middlewares';

export const app = new Koa();

app.use(bodyParser());
app.use(errorMiddleware);
app.use(loggerMiddleware);
app.use(productRouter.routes()).use(productRouter.allowedMethods());
