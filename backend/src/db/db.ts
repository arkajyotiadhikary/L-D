import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    await mongoose.connect(mongodbURI || "");
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Danger - Data leak.
  }
}

export default connectDB;
