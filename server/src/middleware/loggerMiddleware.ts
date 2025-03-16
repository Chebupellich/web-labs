import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger.js';

export const loggerMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        if (res.statusCode >= 500) {
            logger.error({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            });
        } else if (res.statusCode >= 400) {
            logger.warn({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            });
        } else {
            logger.info({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            });
        }
    });

    next();
};
