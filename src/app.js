import express from 'express';
import healthRoutes from './routes/health.routes.js';
import userRoutes from './routes/user.routes.js';
import { notFoundHandler, globalErrorHandler } from './middlewares/error.middleware.js';



const app = express();
app.use(express.json());

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/users', userRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler (always last)
app.use(globalErrorHandler);

// Catch unhandled rejections / sync exceptions at process level
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // let a process manager (pm2/docker) restart cleanly
});

export default app;