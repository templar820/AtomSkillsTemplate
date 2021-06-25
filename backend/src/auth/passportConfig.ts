import passport from 'passport';
import Local from 'passport-local';
import UserService from "../services/UserService";
import passportJWT from "passport-jwt";
const JWTStrategy =  passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


const LocalStrategy = Local.Strategy

passport.serializeUser(function(user, done) {
  console.log('Serrialize', user.email);
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  console.log('Deserialization', user);
  // const user = userDB.id === id ? userDB : false;
  done(null, user);
});



passport.use(
  new LocalStrategy({
    usernameField: 'email',
  }, async function(
    email,
    password,
    done
  ) {
    //Проверяем пользователя на наличие
    const user = await UserService.loginUser({email,password})
    if(user){
      const {email, id, password} = user;
      return done(null, {email, id, password});
    } else {
      return done(null, false);
    }
  })
);

passport.use(
    new JWTStrategy(
        {
          secretOrKey: process.env.SECRET_KEY || 'hacktemplate',
          jwtFromRequest: ExtractJWT.fromHeader('token')
        },
        async (token, done) => {
          try {
              return done(null, token.id);
          } catch (error) {
            done(error);
          }
        }
    )
);