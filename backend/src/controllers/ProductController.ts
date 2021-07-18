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
  public async getPart(@Body() body: ProductsArea): {products: IProductExport[], count: number} {
    console.log(body.offset, body.limit);
    const products = await ProductService.get(body.offset, body.limit);
    const count = await ProductService.getCount();
    console.log(count, products);
    return {products, count};
  }

  @Get("{id}")
  public async getById(id: number) : IProduct {
    return await ProductService.getById(id);
    // const item = new TodoModel({description: description});
    // await item.save();
  }

}


export default new ProductController();
