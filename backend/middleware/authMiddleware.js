import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/userModel.js';
import config from '../config/config.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret,
}

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await UserModel.findByPk(jwtPayload.id)
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }
        return done(null, user)
    } catch (err) {
        return done(err, false)
    }
})

passport.use(jwtStrategy)

export const passportConfig = (passport) => {
    passport.use(jwtStrategy)
}

