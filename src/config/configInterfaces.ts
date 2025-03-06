interface DbConfig {
    host: string;
    port: string;
    user: string;
    password: string;
    dbDefaultName: string;
    dbName: string;
}

interface CorsConfig {
    credentials: boolean;
    origin: string;
}

interface RateLimiterConfig {
    windowMs: number;
    max: number;
    message: string;
    standardHeaders: boolean;
    legacyHeaders: boolean;
}

interface ServerConfig {
    port: string;
    cors: CorsConfig;
    rateLimiter: RateLimiterConfig;
}

interface AuthConfig {
    jwtSecret: string;
    jwtExpire: string;
    maxFailedAttempts: number;
    lockTime: number;
}

interface AppConfig {
    db: DbConfig;
    server: ServerConfig;
    auth: AuthConfig;
}

export { AppConfig };
