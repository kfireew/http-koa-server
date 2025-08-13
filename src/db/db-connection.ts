import mongoose from 'mongoose';
import { nConf } from '../../config/config';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(nConf.get('MONGO_URI'));
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
