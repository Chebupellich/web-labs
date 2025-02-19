module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, error) {
        super(message)
        this.status = status
        this.errors = error
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static InternalServerError(message) {
        return new ApiError(500, message)
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}