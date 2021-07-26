import Router from 'express'
import passport from "passport";
const authRouter = new Router();
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import UserController from "../controllers/UserController";
import jwt from "jsonwebtoken";
import {ServerError} from "../middleware/errorHandler";
import BaseRouter from "./BaseRouter";
import {auth} from "../middleware/authMiddleware";



class AuthRouter extends BaseRouter{
  constructor() {
    super();
    this.createHandleWithBody('post', '/user/register', UserController.createUser)


    this.router.get('/user/logout', (req, res) => {
      req.logOut();
      res.sendFormat(null);
    });

    this.router.post('/user/login', this.authenticate)

    this.router.get('/user/userInfo', auth, asyncMiddleware(async (req, res) => {
      console.log(req.user.id);
      res.sendFormat(await UserController.getUserByToken(req.user.id));
      }
    ));
  }


  authenticate(req, res, next){
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
          const {email, id, role} = user
          const token = jwt.sign({email, id, role}, process.env.SECRET_KEY || 'hacktemplate');
          return res.sendFormat({token});
        });
      })(req, res, next);
    };
}







export default new AuthRouter().router;
