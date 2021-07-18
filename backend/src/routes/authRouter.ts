import Router from 'express'
import passport from "passport";
const authRouter = new Router();
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import UserController from "../controllers/UserController";
import jwt from "jsonwebtoken";
import {ServerError} from "../middleware/errorHandler";
import BaseRouter from "./BaseRouter";



class AuthRouter extends BaseRouter{
  constructor() {
    super();
    this.createHandleWithBody('post', '/user/register', UserController.createUser)
    
  
    this.router.get('/user/logout', (req, res) => {
      req.logOut();
      res.sendFormat(null);
    });
    
    this.router.post('/user/login', (req, res, next) => {
      passport.authenticate('local', {session: false}, function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new ServerError(400, 'Incorrect login or password'));
        }
        req.logIn(user, {session: false}, function(err) {
          if (err) {
            return next(err);
          }
          const {email, id} = user
          const token = jwt.sign({email, id}, process.env.SECRET_KEY || 'hacktemplate');
          return res.sendFormat({token});
        });
      })(req, res, next);
    });
  }
}







export default new AuthRouter().router;
