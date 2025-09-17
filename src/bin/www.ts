import { app } from '../app';
import { connectDB } from '../db';
import { nConf } from '../../config/config';

(async () => {
  await connectDB();
  const port = parseInt(nConf.get('PORT'));
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
})();
