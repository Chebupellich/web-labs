import config from "../config/config.js";
import jwt from "jsonwebtoken"

class TokenService {
    async GenerateToken(user) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, config.auth.jwtSecret, { expiresIn: '1h' });
        return token;
    }
}

export default new TokenService()