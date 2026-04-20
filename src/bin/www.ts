import { app } from '../app';
import { connectDB } from '../db';
import { conf } from '../utils/config';
import { server } from '../graphql/server';
import { koaMiddleware } from '@as-integrations/koa';
import { logger } from '../utils';

(async () => {
  await connectDB();
  await server.start();
  app.use(koaMiddleware(server));
  const port = parseInt(conf.get('port'));
  app.listen(port, () => logger.info(`🚀 Server listening on port ${port}`));
})();
