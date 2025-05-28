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
import UserMapper from '../mappers/userMapper.js';

class UserService {
    async getUsers(): Promise<UserDto[]> {
        return await User.findAll({
            attributes: ['id', 'name', 'email'],
        });
    }

    async getUser(id: number): Promise<UserDto> {
        const foundUser = await User.findByPk(id);
        if (!foundUser) {
            throw new CustomError(
                StatusCodes.Conflict,
                `user with id ${id} not found`,
            );
        }

        return UserMapper.toDto(foundUser);
    }

    async updateUser(user: UserDto): Promise<UserDto> {
        const foundUser = await User.findByPk(user.id);
        if (!foundUser) {
            throw new CustomError(
                StatusCodes.Conflict,
                `user with id ${user.id} not found`,
            );
        }

        const updatedUser = await foundUser.update(user);
        return UserMapper.toDto(updatedUser);
    }

    async createUser(userReq: Required<ReqUserDto>): Promise<UserDto> {
        const hashedPassword: string = await bcrypt.hash(userReq.password, 10);
        const [user, created]: [User, boolean] = await User.findOrCreate({
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

        return UserMapper.toDto(user);
    }

    async login(
        userReq: ReqUserDto,
    ): Promise<{ token: string; user: UserDto }> {
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

        const token = await tokenService.generateToken(existingUser.id);
        const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
        };

        return { token, user };
    }
}

export default new UserService();
