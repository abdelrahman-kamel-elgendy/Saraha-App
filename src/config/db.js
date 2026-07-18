import { MongoClient } from 'mongodb';
import env from './env.js';

let client;

export const connectDB = async () => {
    try {
        client = new MongoClient(env.MONGO_URI);
        await client.connect();

        const db = client.db(env.DATABASE_NAME);
        await db.command({ ping: 1 });

        console.log('Connected to MongoDB.');
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database.');
    }
};

export const getClient = () => client;

export default connectDB;