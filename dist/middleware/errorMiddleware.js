"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiErrors_1 = require("../errors/apiErrors");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof apiErrors_1.CustomError && err.statusCode < 500) {
        res.status(err.statusCode).send(err.message);
        return;
    }
    // TODO: log errors into file
    console.log(err);
    res.status(500).json({ message: 'something went wrong' });
    return;
};
exports.default = ErrorHandler;
