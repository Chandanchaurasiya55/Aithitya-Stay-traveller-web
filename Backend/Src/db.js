import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/atithya_stay';
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`🌿 MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // If local MongoDB is not running, warn but keep process alive if fallback needed
    return null;
  }
};
