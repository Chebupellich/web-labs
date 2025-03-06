import Router from 'express';
import UserController from '@controllers/userController';

const userRouter = Router();

userRouter.get('/users', UserController.getUsers);

export default userRouter;
