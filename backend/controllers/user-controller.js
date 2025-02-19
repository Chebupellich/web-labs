const ApiError = require('../errors/api-error')

class UserController {

    async test(req, res, next) {
        try {
            return res.json("Amogus")
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()