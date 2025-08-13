import { app } from '../app';
import { connectDB } from '../db';
import { nConf } from '../../config/config';

(async () => {
  await connectDB();
  const PORT = parseInt(nConf.get('PORT'));
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
})();
