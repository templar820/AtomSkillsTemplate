import ProductController from '../controllers/ProductController';
import BaseRouter, { requestType } from './BaseRouter';

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/products/part', ProductController.getPart);
    this.createHandleWithBody(requestType.PATCH, '/products', ProductController.update);
    this.createHandleWithBody(requestType.POST, '/products', ProductController.insert, { access: ['ADMIN'] });
    this.createHandleWithParams(requestType.GET, '/products/:id', ProductController.getById, { params: 'id' });
    this.createHandleWithParams(requestType.DELETE, '/products/:id', ProductController.delete, {
      params: 'id',
      access: ['ADMIN'],
      callback: this.deleteCallback
    });
    this.createHandleWithBody(requestType.POST, '/products/search', ProductController.search);
  }

  deleteCallback(answer, req, res): boolean {
    console.log(111111111111111111111, answer);
    return true;
  }
}

export default new ProductRouter().router;
