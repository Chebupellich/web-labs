import UserModel from "../models/userModel.js";

class UserService {
    async getUsers() {
        const users = await UserModel.findAll()
        return users
    }

    async createUser(name, email) {
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return null
        }

        const newUser = await UserModel.create({ name, email, createdAt: new Date() });
        return newUser
    }
}

export default new UserService()