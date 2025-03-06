"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ForbiddenError = exports.NotFoundError = exports.AuthorizationError = exports.ValidationError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class ValidationError extends CustomError {
    constructor(message = 'Validation error') {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class AuthorizationError extends CustomError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}
exports.AuthorizationError = AuthorizationError;
class ForbiddenError extends CustomError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
