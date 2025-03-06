"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
            messageFormat: '{method} {url} | {statusCode} | - {responseTime}ms | {remoteAddress}',
            hideObject: true,
        },
    },
});
exports.logger = logger;
const loggerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else if (res.statusCode >= 400) {
            logger.warn({
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
                remoteAddress: req.socket.remoteAddress,
            });
        }
        else {
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
});
exports.loggerMiddleware = loggerMiddleware;
