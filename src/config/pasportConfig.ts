import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
    VerifiedCallback,
} from 'passport-jwt';
import { User } from '@models/user.js';
import passport from 'passport';
import { appConfig } from './appConfig.js';

interface JwtPayload {
    id: string;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.auth.jwtSecret,
};

const jwtStrategy = new JwtStrategy(
    options,
    async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
        try {
            const user = await User.findByPk(jwtPayload.id);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    },
);

passport.use(jwtStrategy);

export const passportConfig = (passport: passport.PassportStatic) => {
    passport.use(jwtStrategy);
};
