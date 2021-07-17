import {ServerError} from "../middleware/errorHandler";
import ProductService from "../services/ProductService";
import {Controller, Get, Post, Body, BodyProp, Route, Tags} from "tsoa"
import {IProduct, ISubstance} from "../models/DbModel";

interface IProductExport extends IProduct{
  substance: ISubstance,
}

@Route("/api/product")
@Tags("Products")
class ProductController extends Controller{
  @Post()
  public async get(@BodyProp() offset: number = 0, @BodyProp() limit: number = 48): {products: IProductExport[], count: number} {
    const products = await ProductService.get(offset, limit);
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
