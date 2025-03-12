import bcrypt from 'bcrypt';
import tokenService from './tokenService.js';
import { UserResponseDto, UserDto, UserRequestDto } from '@dtos/userDto.js';
import { config } from '@config/config.js';
import { User } from '@models/User';
import { CustomError, ErrorMessages, StatusCodes } from '@errors/apiErrors';

class UserService {
    async getUsers(): Promise<UserDto[]> {
        return await User.findAll({
            attributes: ['id', 'name', 'email'],
        });
    }

    async createUser(userReq: UserRequestDto): Promise<UserDto> {
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

    async login(userReq: UserRequestDto): Promise<UserResponseDto> {
        const existingUser: User | null = await User.findOne({
            where: { email: userReq.email },
        });
        if (!existingUser) {
            throw new CustomError(
                StatusCodes.Unauthorized,
                ErrorMessages.Unauthorized,
            );
        }

        if (
            existingUser.lockedUntil &&
            new Date() < new Date(existingUser.lockedUntil)
        ) {
            throw new CustomError(
                StatusCodes.Unauthorized,
                `Account is locked. Try again after ${existingUser.lockedUntil}`,
            );
        }

        const isPasswordsEqual = await bcrypt.compare(
            userReq.password,
            existingUser.password,
        );

        if (!isPasswordsEqual) {
            existingUser.failedAttempts += 1;

            if (existingUser.failedAttempts >= config.auth.maxFailedAttempts) {
                existingUser.lockedUntil = new Date(
                    Date.now() + config.auth.lockTime,
                );
                existingUser.failedAttempts = 0;
            }

            await existingUser.save();
            throw new CustomError(
                StatusCodes.Unauthorized,
                ErrorMessages.Unauthorized,
            );
        }

        const token = await tokenService.GenerateToken(existingUser.id);
        const userDto: UserDto = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
        };

        return {
            user: userDto,
            token: token,
        };
    }
}

export default new UserService();
