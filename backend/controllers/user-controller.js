const ApiError = require('../errors/api-error');
const UserModel = require('../models/user-model');

class UserController {

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Получить всех пользователей
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Список пользователей
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: Пользователи не найдены
     */
    async GetUsers(req, res, next) {
        try {
            const users = await UserModel.findAll();

            if (!users || users.length == 0) {
                return next(ApiError.BadRequest('users not found'));
            }

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Создать нового пользователя
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: Пользователь успешно создан
     *       400:
     *         description: Ошибка в запросе
     */
    async CreateUser(req, res, next) {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return next(ApiError.BadRequest('name and email required'));
            }

            const existingUser = await UserModel.findOne({ where: { email } });
            if (existingUser) {
                return next(ApiError.BadRequest('email already exists'));
            }

            const newUser = await UserModel.create({ name, email, createdAt: new Date() });
            return res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
