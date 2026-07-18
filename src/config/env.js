import express from 'express';


export default env = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    DB_PATH: process.env.DB_PATH || 'sarah.db',
    NODE_ENV: process.env.NODE_ENV || 'development',
};

if (env.NODE_ENV === 'production' && env.JWT_SECRET === 'dev-secret-change-me') {
    throw new Error('JWT_SECRET must be set in production');
}
