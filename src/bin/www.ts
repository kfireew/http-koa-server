import app from '../app';
import { connectDB } from '../db/db-connection';

const PORT = parseInt(process.env.PORT || '3000', 10);

(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
})();
