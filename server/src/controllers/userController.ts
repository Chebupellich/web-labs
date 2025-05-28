import { Request, Response, NextFunction } from 'express';
import UserService from '@services/userService.js';
import { ReqUserDto } from '@dtos/userDto.js';
import { z } from 'zod';
import { Categories } from '@models/event';

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'password required'),
});
const registrationSchema = loginSchema.extend({
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    name: z.string().min(1, 'Name is required'),
});

const eventIdSchema = z.coerce
    .number()
    .int('eventId must be an integer')
    .positive('eventId must be a positive integer');

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

    static async getUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userId = eventIdSchema.parse(req.params.id);
            const user = await UserService.getUser(userId);

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    static async updateUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            // TODO: Validation
            const user = await UserService.updateUser(req.body);
            res.status(200).json(user);
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
