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
    this.createHandleWithParams('get', '/products/:id', ProductController.getById, 'id')
    this.createHandleWithParams('delete', '/products/:id', ProductController.delete, 'id')
    this.createHandleWithQueryParams('get', '/products/?', ProductController.search, 'product')
  }
}





export default new ProductRouter().router;
