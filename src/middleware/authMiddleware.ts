import passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
    VerifiedCallback,
} from 'passport-jwt';
import { User } from '@models/User';
import { config } from '../config/config';

interface JwtPayload {
    id: string;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret,
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
