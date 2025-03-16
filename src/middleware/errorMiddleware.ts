import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@errors/customError.js';
import { ZodError } from 'zod';

const ErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (err instanceof CustomError && err.statusCode < 500) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    if (err instanceof SyntaxError) {
        res.status(400).json({ error: 'Invalid syntax' });
        return;
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            message: 'Validation failed',
            errors: err.errors.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
        return;
    }

    // TODO: log errors into file
    console.log(err);
    res.status(500).json({ message: 'something went wrong' });
    return;
};

export default ErrorHandler;
