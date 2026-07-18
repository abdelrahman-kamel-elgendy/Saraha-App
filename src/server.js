import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';

connectDB()
    .then(() => {
        app.listen(env.PORT, () => {
            console.log(`Server running at http://localhost:${env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Startup failed:', err.message);
        process.exit(1);
    });