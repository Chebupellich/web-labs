import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService.js';

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
    static async getUsers(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (e) {
            next(e);
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
    static async registration(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({
                    message:
                        'invalid input. required fields: name, email, password',
                });
                return;
            }

            const existingUser = await UserService.createUser(
                name,
                email,
                password,
            );
            if (existingUser) {
                res.status(400).json({ message: 'user already exists' });
                return;
            }
            res.status(201).json({ message: 'registration successful' });
        } catch (e) {
            next(e);
        }
    }

    static async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    message: 'invalid input. required fields: email, password',
                });
                return;
            }

            const userData = await UserService.login(email, password);
            res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
