import { Request, Response, NextFunction } from 'express';
import UserService from '@services/userService.js';
import { ReqUserDto } from '@dtos/userDto.js';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'password required'),
});
const registrationSchema = loginSchema.extend({
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    name: z.string().min(1, 'Name is required'),
});

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
            const userReq: Required<ReqUserDto> = registrationSchema.parse(
                req.body,
            );
            const createdUser = await UserService.createUser(userReq);

            res.status(201).json(createdUser);
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
            const userReq: ReqUserDto = loginSchema.parse(req.body);
            const userData = await UserService.login(userReq);

            res.status(200).json({
                accessToken: userData.token,
                user: userData.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
