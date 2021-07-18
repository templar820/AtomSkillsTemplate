import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import SubstancesController from "../controllers/SubstancesController";
import ProductController from "../controllers/ProductController";
import BaseRouter from "./BaseRouter";


class ProductRouter extends BaseRouter{
  
  constructor() {
    super();
    
    
    
    // this.router.get('/users', asyncMiddleware(UserController.getAll));
    //
    // this.router.get('/users/:id', asyncMiddleware(UserController.getOne));
    
    this.createHandleWithBody('post', '/products/part', ProductController.getPart)
    this.createHandleWithQueryParams('get', '/products/:id', ProductController.getById, 'id')
  }
  
  
  
  
}





export default new ProductRouter().router;
