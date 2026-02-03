import { app } from '../app';
import { connectDB } from '../db';
import { conf } from '../utils/config';
import { server } from '../graphql/server';

(async () => {
  await connectDB();
  await server.start();
  const port = parseInt(conf.get('port'));
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
})();
