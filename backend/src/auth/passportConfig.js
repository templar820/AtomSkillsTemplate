import passport from 'passport';
import Local from 'passport-local';
import UserService from "../services/UserService.js";


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
  new LocalStrategy({ usernameField: 'email' }, async function(
    email,
    password,
    done
  ) {
    //Проверяем пользователя на наличие
    const user = await UserService.loginUser({email,password})
    if(user){
      const {email, id, password} = user;
      console.log(111111111);
      return done(null, {email, id, password});
    } else {
      return done(null, false);
    }
  })
);