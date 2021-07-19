import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import SubstancesController from "../controllers/SubstancesController";
import ProductController from "../controllers/ProductController";
import BaseRouter from "./BaseRouter";


class ProductRouter extends BaseRouter{

  constructor() {
    super();
    
    this.createHandleWithBody('post', '/products/part', ProductController.getPart)
    this.createHandleWithBody('patch', '/products', ProductController.update)
    this.createHandleWithBody('post', '/products', ProductController.insert)
    this.createHandleWithQueryParams('get', '/products/:id', ProductController.getById, 'id')
    this.createHandleWithQueryParams('delete', '/products/:id', ProductController.delete, 'id')
  }




}





export default new ProductRouter().router;
