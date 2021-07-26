import ProductController from "../controllers/ProductController";
import BaseRouter from "./BaseRouter";


class ProductRouter extends BaseRouter{

  constructor() {
    super();
    this.createHandleWithBody('post', '/products/part', (data) => ProductController.getPart(data))
    this.createHandleWithBody('patch', '/products', (data) => ProductController.update(data))
    this.createHandleWithBody('post', '/products', (data) => ProductController.insert(data), ['ADMIN'])
    this.createHandleWithParams('get', '/products/:id', (data)=> ProductController.getById(data), 'id')
    this.createHandleWithParams('delete', '/products/:id', (data) => ProductController.delete(data), 'id', ['ADMIN'])
    this.createHandleWithQueryParams('get', '/products/?', (data) => {
      console.log(data);
      return ProductController.search(...data)
    }, ['product', 'offset', 'limit'])
  }
}





export default new ProductRouter().router;
