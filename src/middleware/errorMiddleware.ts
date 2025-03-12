import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@errors/apiErrors';

const ErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (err instanceof CustomError && err.statusCode < 500) {
        res.status(err.statusCode).send(err.message);
        return;
    }

    // TODO: log errors into file
    console.log(err);
    res.status(500).json({ message: 'something went wrong' });
    return;
};

export default ErrorHandler;
