import express, { Express } from 'express';
import passport from 'passport';

import { sequelize } from '@config/dbConfig.js';
import { appConfig } from '@config/appConfig.js';
import { passportConfig } from '@config/pasportConfig.js';

import { setupMiddlewares } from '@middleware/_middlewares.js';
import { setupRoutes } from '@routes/_routes.js';
import { setupAssociations } from '@models/associations.js';
import errorMiddleware from '@middleware/errorMiddleware.js';

const app: Express = express();
passportConfig(passport);

setupMiddlewares(app);
setupRoutes(app);

app.use(errorMiddleware);

const connectDB = async () => {
    await sequelize.authenticate();
    await setupAssociations();
    await sequelize.sync({ force: false });

    console.log('db Connected');
};

const start = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(appConfig.server.port, () =>
            console.log(`Server run on ${appConfig.server.port}`),
        );
    } catch (e) {
        console.log(e);
    }
};

start();
