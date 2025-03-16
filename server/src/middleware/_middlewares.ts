import { appConfig } from '@config/appConfig.js';
import { Express, json } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import passport from 'passport';

import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

import { loggerMiddleware } from './loggerMiddleware.js';
import swaggerOptions from '@utils/swaggerConf.js';

export const setupMiddlewares = (app: Express) => {
    app.use(json());
    app.use(rateLimit(appConfig.server.rateLimiter));
    app.use(cors(appConfig.server.cors));
    app.use(passport.initialize());

    app.use('/api-docs', serve, setup(swaggerJSDoc(swaggerOptions)));
    app.use(loggerMiddleware);
};
