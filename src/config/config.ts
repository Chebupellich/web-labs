import dotenv from 'dotenv';
import { AppConfig } from './configInterfaces';

dotenv.config();

const config: AppConfig = {
    db: {
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        dbDefaultName: process.env.DB_DEFAULT_NAME as string,
        dbName: process.env.DB_NAME as string,
    },
    server: {
        port: process.env.PORT as string,
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL as string,
        },
        rateLimiter: {
            windowMs: 60000,
            max: 50,
            message:
                'Too many requests from this IP, please try again after a minute',
            standardHeaders: true,
            legacyHeaders: false,
        },
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET_KEY as string,
        jwtExpire: '1h',

        maxFailedAttempts: 5,
        lockTime: 5 * 60 * 1000,
    },
};

export default config;
