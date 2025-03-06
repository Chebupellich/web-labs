"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbDefaultName: process.env.DB_DEFAULT_NAME,
        dbName: process.env.DB_NAME,
    },
    server: {
        port: process.env.PORT,
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL,
        },
        rateLimiter: {
            windowMs: 60000,
            max: 50,
            message: 'Too many requests from this IP, please try again after a minute',
            standardHeaders: true,
            legacyHeaders: false,
        },
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET_KEY,
        jwtExpire: '1h',
        maxFailedAttempts: 5,
        lockTime: 5 * 60 * 1000,
    },
};
exports.default = config;
