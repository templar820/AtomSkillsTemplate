import Router from 'express'
import passport from "passport";
const authRouter = new Router();
import {asyncMiddleware} from "../middleware/asyncMiddleware.js";
import UserController from "../controllers/UserController.js";
import jwt from "jsonwebtoken";



authRouter.post('/user/login', (req, res, next) => {
  passport.authenticate('local', {session: false} ,function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, {session: false}, function(err) {
      if (err) {
        return next(err);
      }
      const {email, id} = user
      const token = jwt.sign({email, id}, process.env.SECRET_KEY);
      return res.json({token});
    });
  })(req, res, next);
});


authRouter.post('/user/register', asyncMiddleware(UserController.create));

authRouter.get('/user/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

export default authRouter;
