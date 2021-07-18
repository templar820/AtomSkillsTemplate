import Router, {Express} from 'express'
import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import SubstancesController from "../controllers/SubstancesController";
import ProductController from "../controllers/ProductController";


class ProductRouter {
  router: Express;
  
  constructor() {
    this.router = new Router();
    // this.router.use(asyncMiddleware)
    // this.router.get('/users', asyncMiddleware(UserController.getAll));
    // this.router.get('/users/userInfo', asyncMiddleware(UserController.getUserByToken));
    // this.router.get('/users/:id', asyncMiddleware(UserController.getOne));
    // this.router.put('/users', asyncMiddleware(UserController.update));
    // this.router.delete('/users/:id', asyncMiddleware(UserController.delete));
    // this.router.get('/substances', asyncMiddleware(SubstancesController.getAll));
    this.router.post('/products', asyncMiddleware(ProductController.get));
  }
  
}





export default new ProductRouter().router;
