import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI.replace(
      '<password>',
      process.env.MONGO_DB_PW
    );
    const connect = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
