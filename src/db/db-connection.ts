import mongoose from 'mongoose';
import { conf } from '../utils/config';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(conf.get('mongoURI'));
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
