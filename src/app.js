import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/messages.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';



export default app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

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