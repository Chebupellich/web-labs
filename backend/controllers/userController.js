import UserService from "../services/userService.js";

class UserController {

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get a list of users
     *     description: Fetch a list of all users in the system.
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers()
            return res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     description: Create a new user by providing the necessary details (name and email).
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the user
     *               email:
     *                 type: string
     *                 description: The email of the user
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request, missing fields or user already exists
     *       500:
     *         description: Internal server error
     */
    async registration(req, res, next) {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ message: "invalid input. required fields: name, email, password" })
            }

            const existingUser = await UserService.createUser(name, email, password)
            if (existingUser) {
                return res.status(400).json({ message: "user already exists" })
            }
            return res.status(201).json({ message: "registration successful" })
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ message: "invalid input. required fields: email, password" })
            }

            const userData = await UserService.login(email, password)
            return res.status(201).json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
