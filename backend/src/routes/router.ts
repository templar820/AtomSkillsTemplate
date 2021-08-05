import ProductController from '../controllers/ProductController';
import BaseRouter, { requestType } from './BaseRouter';

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/products/part', ProductController.getPart);
    this.createHandleWithBody(requestType.PATCH, '/products', ProductController.update);
    this.createHandleWithBody(requestType.POST, '/products', ProductController.insert, ['ADMIN']);
    this.createHandleWithParams(requestType.GET, '/products/:id', ProductController.getById, 'id');
    this.createHandleWithParams(requestType.DELETE, '/products/:id', ProductController.delete, 'id', ['ADMIN']);
    this.createHandleWithBody(requestType.POST, '/products/search', ProductController.search);
  }
}

export default new ProductRouter().router;
