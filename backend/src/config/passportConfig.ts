import passport from 'passport';
import Local from 'passport-local';
import passportJWT from 'passport-jwt';
import UserService from '../services/UserService';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = Local.Strategy;

passport.serializeUser((user, done) => {
  console.log('Serrialize', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('Deserialization', user);
  // const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({
    usernameField: 'email',
  }, (async (
    email,
    password,
    done
  ) => {
    // Проверяем пользователя на наличие
    const user = await UserService.loginUser({ email, password });
    if (user) {
      const {
        email, id, password, role
      } = user;
      return done(null, {
        email, id, password, role
      });
    }
    return done(null, false);
  }))
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY || 'hacktemplate',
      jwtFromRequest: ExtractJWT.fromHeader('token')
    },
    async (token, done) => {
      console.log('IN JWT: ', token);
      try {
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);
