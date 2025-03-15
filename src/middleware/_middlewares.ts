import { appConfig } from '@config/appConfig.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import passport from 'passport';
import { loggerMiddleware } from '@utils/logger.js';
import { Express } from 'express';

export const setupMiddlewares = (app: Express) => {
    app.use(rateLimit(appConfig.server.rateLimiter));
    app.use(cors(appConfig.server.cors));
    app.use(passport.initialize());
    app.use(loggerMiddleware);
};
