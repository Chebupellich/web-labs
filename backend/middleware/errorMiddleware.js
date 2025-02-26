import { logger } from "../utils/logger.js";

const ErrorHandler = (err, req, res, next) => {

    if (err.statusCode < 500) {
        return res.status(err.statusCode).send(err.message)
    }

    // TODO: log errors into file
    console.log(err)
    return res.status(500).send("something went wrong");
}

export default ErrorHandler