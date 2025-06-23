import mongoose from 'mongoose';
import { get } from '../../config/config';

const MONGO_URI = get('MONGO_URI');

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
