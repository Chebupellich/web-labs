class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

enum StatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    Conflict = 409,
}

enum ErrorMessages {
    ValidationError = 'Validation error',
    Unauthorized = 'Unauthorized',
    ForbiddenError = 'ForbiddenError',
}

export { CustomError, StatusCodes, ErrorMessages };
