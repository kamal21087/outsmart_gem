import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI or DATABASE_URL must be defined in the .env file.');
}

// Connect to the database
const connectDB = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI); // No options needed in Mongoose 6+
    console.log(
      `Database connected successfully to: ${
        MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'
      }`
    );
    return mongoose.connection;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database connection error:', error.message);
    } else {
      console.error('Unknown database connection error:', error);
    }
    throw new Error('Database connection failed.');
  }
};

export default connectDB;
