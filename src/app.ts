import express, { json, Express } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { loggerMiddleware } from './utils/logger.js';

import config from './config/config.js';
import { connectDB } from './config/db.js';
import eventRoutes from './routing/eventRoutes.js';
import userRoutes from './routing/userRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import swaggerSpec from './utils/swaggerConf.js';
import passport from 'passport';
import { passportConfig } from './middleware/authMiddleware.js';
import authRouter from './routing/authRouter.js';

const app: Express = express();
passportConfig(passport);

app.use('/api-docs', serve, setup(swaggerSpec));
app.use(rateLimit(config.server.rateLimiter));
app.use(json());
app.use(cors(config.server.cors));
app.use(passport.initialize());
app.use(loggerMiddleware);

app.use(authRouter);
app.use(userRoutes);
app.use(eventRoutes);
app.use(errorMiddleware);

const start = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(config.server.port, () =>
            console.log(`Server run on ${config.server.port}`),
        );
    } catch (e) {
        console.log(e);
    }
};

start();
