import Router from 'express'
import passport from "passport";
const authRouter = new Router();
import "../auth/passportConfig.js"
import {asyncMiddleware} from "../middleware/asyncMiddleware.js";
import UserController from "../controllers/UserController.js";



authRouter.post('/user/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({message: "success"});
    });
  })(req, res, next);
});



authRouter.post('/user/register', asyncMiddleware(UserController.create));

authRouter.get('/user/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

export default authRouter;
