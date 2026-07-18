import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });


const env = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    DATABASE_NAME: process.env.DATABASE_NAME || 'SarahaDB',
};

if (env.NODE_ENV === 'production' && env.JWT_SECRET === 'dev-secret-change-me') {
    throw new Error('JWT_SECRET must be set in production');
}

export default env;
