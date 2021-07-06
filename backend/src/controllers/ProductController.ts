import {ServerError} from "../middleware/errorHandler";
import ProductService from "../services/ProductService";

class ProductController {
  async get(req, res: any) {
    const {offset = 0, limit = 48} = req.body;
    const products = await ProductService.get(offset, limit);
    const count = await ProductService.getCount();
    return res.sendFormat({products, count});
  }

}


export default new ProductController();