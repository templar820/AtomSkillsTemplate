import {ServerError} from "../middleware/errorHandler";
import ProductService from "../services/ProductService";
import {Controller, Get, Post, Body, BodyProp, Route, Tags, Security, Header} from "tsoa"
import {IProduct, ISubstance} from "../models/DbModel";

interface IProductExport extends IProduct{
  substance: ISubstance,
}

interface ProductsArea {
  offset: number;
  limit: number;
}

@Route("/products")
@Tags("Products")
@Security("api_key")
class ProductController extends Controller{
  @Post("/part")
  public async get(@Body() body: ProductsArea): {products: IProductExport[], count: number} {
    const products = await ProductService.get(body.offset, body.limit);
    const count = await ProductService.getCount();
    return {products, count};
  }

  @Post("/foo")
  public async create(@BodyProp() description: string) : Promise<void> {
    // const item = new TodoModel({description: description});
    // await item.save();
  }

}


export default new ProductController();
