import Router from 'express';
import UserController from '../controllers/userController.js';

const authRouter = Router();

authRouter.post('/register', UserController.registration);

authRouter.post('/login', UserController.login);

export default authRouter;
