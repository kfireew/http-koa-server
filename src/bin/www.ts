import { app } from '../app';
import { connectDB } from '../db';
import { conf } from '../utils/config';

(async () => {
  await connectDB();
  const port = parseInt(conf.get('port'));
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
})();
