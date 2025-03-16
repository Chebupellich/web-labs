import pino from 'pino';

const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
            messageFormat:
                '{method} {url} | {statusCode} | - {responseTime}ms | {remoteAddress}',
            hideObject: true,
        },
    },
});

export { logger };
