import eventRoutes from '@routes/eventRoutes.js';
import userRoutes from '@routes/userRoutes.js';
import authRouter from '@routes/authRouter.js';
import { Express } from 'express';

export const setupRoutes = (app: Express) => {
    app.use(authRouter);
    app.use(userRoutes);
    app.use(eventRoutes);
};
