import mongoose from 'mongoose';
import { conf } from '../utils/config';
import { logger } from '../utils';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(conf.get('mongoURI'));
    logger.info('✅ MongoDB connected');
  } catch (err) {
    logger.info('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
