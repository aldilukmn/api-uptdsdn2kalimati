import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.log('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

export default mongoose;