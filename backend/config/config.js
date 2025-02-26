import dotenv from "dotenv"
dotenv.config()

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbDefaultName: process.env.DB_DEFAULT_NAME,
        dbName: process.env.DB_NAME
    },
    server: {
        port: process.env.PORT || 3000,
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
        }
    },
    auth: {
        //jwtSecret: process.env.JWT_SECRET,
    },
};

export default config
