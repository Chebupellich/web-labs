import Router from "express"
import UserController from "../controllers/userController.js"

const userRouter = new Router()

userRouter.get('/users', UserController.getUsers)

userRouter.post('/users', UserController.createUser)

export default userRouter