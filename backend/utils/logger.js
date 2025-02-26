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
            messageFormat: '{method} {url} | {statusCode} | - {responseTime}ms | {remoteAddress}',
            hideObject: true
        }
    }
})

const loggerMiddleware = async (req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start

        if (res.statusCode >= 500) {
            logger.error({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            })
        } else if (res.statusCode >= 400) {
            logger.warn({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            })
        } else {
            logger.info({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            })
        }


    })

    next()
}

export { logger, loggerMiddleware }
