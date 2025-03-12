import { Request, Response, NextFunction } from 'express';
import UserService from '@services/userService';
import { UserRequestDto } from '@dtos/userDto';

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
            const userReq: UserRequestDto = req.body;

            if (!userReq.name || !userReq.email || !userReq.password) {
                res.status(400).json({
                    message:
                        'invalid input. required fields: name, email, password',
                });
                return;
            }

            const createdUser = await UserService.createUser(userReq);

            res.status(201).json({
                message: 'registration successful',
                createdUser: createdUser,
            });
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
            const userReq: UserRequestDto = req.body;
            if (!userReq.email || !userReq.password) {
                res.status(400).json({
                    message: 'invalid input. required fields: email, password',
                });
                return;
            }

            const userData = await UserService.login(userReq);
            res.status(200).json();
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
