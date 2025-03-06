import Router from 'express';
import UserController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/users', UserController.getUsers);

export default userRouter;
