import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${env.MONGO_URI}/${env.DATABASE_NAME}`);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database.');
    }
};

export default connectDB;