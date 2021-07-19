import {ServerError} from "../middleware/errorHandler";
import ProductService from "../services/ProductService";
import {Controller, Get, Post, Body, BodyProp, Route, Tags, Security, Header} from "tsoa"
import Product, {IProduct} from "../models/Product";

interface ProductsArea {
  offset: number;
  limit: number;
}

@Route("/products")
@Tags("Products")
@Security("api_key")
class ProductController extends Controller{
  @Post("/part")
  public async getPart(@Body() body: ProductsArea): {products: IProduct[], count: number} {
    const products = await ProductService.get(body.offset, body.limit);
    const count = await ProductService.getCount();
    return {products, count};
  }

  @Get("{id}")
  public async getById(id: number) : Promise<IProduct> {
    return await ProductService.getById(id);
    // const item = new TodoModel({description: description});
    // await item.save();
  }
  
  @Post()
  public async insert(@Body() body: IProduct[]): Promise<boolean> {
    for await (const el of body) {
      await ProductService.create(el);
    }
    return true
  }
}


export default new ProductController();
