import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import SubstancesController from "../controllers/SubstancesController";
import ProductController from "../controllers/ProductController";
import BaseRouter from "./BaseRouter";


class ProductRouter extends BaseRouter{

  constructor() {
    super();
    this.createHandleWithBody('post', '/products/part', (data) => ProductController.getPart(data))
    this.createHandleWithBody('patch', '/products', (data) => ProductController.update(data))
    this.createHandleWithBody('post', '/products', (data) => ProductController.insert(data))
    this.createHandleWithParams('get', '/products/:id', (data)=> ProductController.getById(data), 'id')
    this.createHandleWithParams('delete', '/products/:id', (data) => ProductController.delete(data), 'id')
    this.createHandleWithQueryParams('get', '/products/?', (data) => ProductController.search(data), 'product')
  }
}





export default new ProductRouter().router;
