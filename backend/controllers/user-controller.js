const ApiError = require('../errors/api-error')
const UserModel = require('../models/user-model')
class UserController {

    async GetUsers(req, res, next) {
        try {
            const users = await UserModel.findAll();

            if (!users || users.length == 0) {
                return next(ApiError.BadRequest('users not found'));
            }

            return res.json(users);
        } catch (e) {
            next(e)
        }
    }

    async CreateUser(req, res, next) {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return next(ApiError.BadRequest('name and email required'));
            }

            const existingUser = await UserModel.findOne({ where: { email } });
            if (existingUser) {
                return next(ApiError.BadRequest('Пользователь с таким email уже существует.'));
            }

            const newUser = await UserModel.create({ name, email, createdAt: new Date() });
            return res.status(201).json(newUser);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()