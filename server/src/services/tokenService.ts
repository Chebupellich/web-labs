import { appConfig } from '@config/appConfig.js';
import jwt from 'jsonwebtoken';

class TokenService {
    async generateToken(uid: number) {
        return jwt.sign({ id: uid }, appConfig.auth.jwtSecret, {
            expiresIn: appConfig.auth.jwtExpire,
        } as jwt.SignOptions);
    }
}

export default new TokenService();
