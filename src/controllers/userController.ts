import { Request, Response, NextFunction } from 'express';
import UserService from '@services/userService';

class UserController {
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
