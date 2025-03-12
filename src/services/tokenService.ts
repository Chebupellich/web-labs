import config from '@config/config';
import jwt from 'jsonwebtoken';

class TokenService {
    async GenerateToken(uid: number) {
        //todo нейм
        const token = jwt.sign({ id: uid }, config.auth.jwtSecret, {
            expiresIn: config.auth.jwtExpire,
        } as jwt.SignOptions);

        return token;
    }
}

export default new TokenService(); //todo нейминг файлов по ГОСТу
