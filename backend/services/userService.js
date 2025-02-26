import { AuthorizationError } from "../errors/apiErrors.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
class UserService {
    async getUsers() {
        const users = await UserModel.findAll()
        return users
    }

    async createUser(name, email, password) {
        const existingUser = await UserModel.findOne({ where: { email } })
        if (existingUser) {
            return existingUser
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await UserModel.create({ name, email, password: hashedPassword })
        return null
    }

    async login(email, password) {
        const existingUser = await UserModel.findOne({ where: { email: email } })
        if (!existingUser) {
            throw new AuthorizationError("Incorrect login or password")
        }

        const isPasswordsEqual = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordsEqual) {
            throw new AuthorizationError("Incorrect login or password")
        }

        const token = await tokenService.GenerateToken(existingUser)
        const userDto = new UserDto(existingUser)

        return {
            user: userDto,
            token: token
        }
    }
}

export default new UserService()