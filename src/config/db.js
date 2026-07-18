import { MongoClient } from 'mongodb';


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'SarahDB';


export const databaseConnection = async () => {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('Connected to MongoDB.');
        return client.db(DATABASE_NAME);
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database.');
    }
}