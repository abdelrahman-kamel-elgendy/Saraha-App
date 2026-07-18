import { getClient } from '../config/db.js';

export const check = async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        db: 'unknown',
    };

    try {
        const client = getClient();
        await client.db().command({ ping: 1 });
        health.db = 'ok';
    } catch (err) {
        health.db = 'error';
        health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
};

export default check;