import app from '../app';
import { connectDB } from '../db/db-connection';
import { get } from '../../config/config';

const PORT = parseInt(get('PORT'), 10);

(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
})();
