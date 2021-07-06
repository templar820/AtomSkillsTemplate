import {ServerError} from "../middleware/errorHandler";
import UserService from "../services/UserService";
import ProductService from "../services/ProductService";

class ProductController {
  async getAll(req, res: any) {
    const products = await ProductService.getAll();
    return res.sendFormat(products);
  }

}


export default new ProductController();