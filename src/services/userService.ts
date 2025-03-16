import bcrypt from 'bcrypt';
import tokenService from './tokenService.js';
import { ReqUserDto, UserDto } from '@dtos/userDto.js';
import { appConfig } from '@config/appConfig.js';
import { User } from '@models/user.js';
import {
    CustomError,
    ErrorMessages,
    StatusCodes,
} from '@errors/customError.js';

class UserService {
    async getUsers(): Promise<UserDto[]> {
        return await User.findAll({
            attributes: ['id', 'name', 'email'],
        });
    }

    async createUser(userReq: Required<ReqUserDto>): Promise<UserDto> {
        const hashedPassword: string = await bcrypt.hash(userReq.password, 10);
        const [user, created]: [UserDto, boolean] = await User.findOrCreate({
            where: { email: userReq.email },
            defaults: {
                name: userReq.name,
                email: userReq.email,
                password: hashedPassword,
                failedAttempts: 0,
            },
            attributes: ['id', 'name', 'email'],
        });

        if (!created) {
            throw new CustomError(StatusCodes.Conflict, 'User already exists');
        }

        return user;
    }

    async login(userReq: ReqUserDto): Promise<string> {
        const existingUser: User | null = await User.findOne({
            where: { email: userReq.email },
        });
        if (!existingUser) {
            throw new CustomError(
                StatusCodes.Unauthorized,
                ErrorMessages.Unauthorized,
            );
        }

        const isPasswordsEqual = await bcrypt.compare(
            userReq.password,
            existingUser.password,
        );

        if (!isPasswordsEqual) {
            if (
                existingUser.lockedUntil &&
                new Date() < new Date(existingUser.lockedUntil)
            ) {
                throw new CustomError(
                    StatusCodes.Unauthorized,
                    `Account is locked. Try again after ${existingUser.lockedUntil}`,
                );
            }

            existingUser.failedAttempts += 1;

            if (
                existingUser.failedAttempts >= appConfig.auth.maxFailedAttempts
            ) {
                existingUser.lockedUntil = new Date(
                    Date.now() + appConfig.auth.lockTime,
                );
                existingUser.failedAttempts = 0;
            }

            await existingUser.save();
            throw new CustomError(
                StatusCodes.Unauthorized,
                ErrorMessages.Unauthorized,
            );
        }

        return await tokenService.generateToken(existingUser.id);
    }
}

export default new UserService();
