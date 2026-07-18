import mongoose from 'mongoose';

export const check = async (req, res) => {
    const dbStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    const dbState = mongoose.connection.readyState;

    const health = {
        status: dbState === 1 ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
            status: dbStates[dbState] || 'unknown',
            name: mongoose.connection.name || null,
            host: mongoose.connection.host || null,
        },
    };

    const statusCode = dbState === 1 ? 200 : 503;

    res.status(statusCode).json(health);
};

export default check;