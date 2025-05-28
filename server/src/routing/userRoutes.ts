import Router from 'express';
import UserController from '@controllers/userController.js';
import passport from 'passport';

const userRouter = Router();

userRouter.get('/users', UserController.getUsers);

userRouter.use(passport.authenticate('jwt', { session: false }));

userRouter.get('/profile/user/:id', UserController.getUser);

userRouter.put('/profile/update', UserController.updateUser);

export default userRouter;
