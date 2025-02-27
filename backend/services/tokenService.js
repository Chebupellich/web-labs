import config from "../config/config.js";
import jwt from "jsonwebtoken"

class TokenService {
    async GenerateToken(user) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpire });
        return token;
    }
}

export default new TokenService()