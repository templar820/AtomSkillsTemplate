import ProductService from "../services/ProductService";
import {Body, Controller, Delete, Get, Patch, Post, Route, Security, Tags} from "tsoa"
import {IProduct} from "../models/Product";
import {ServerError} from "../middleware/errorHandler";

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
    const products = await ProductService.getPart(body.offset, body.limit);
    const count = await ProductService.getCount();
    return {products, count};
  }

  @Get("{id}")
  public async getById(id: number) : Promise<IProduct> {
    const product = await ProductService.getById(id);
    if (!product) throw new ServerError(500, "Сущность не найдена");
    return product
  }
  
  @Post()
  public async insert(@Body() body: IProduct[]): Promise<boolean> {
    for await (const el of body) {
      await ProductService.create(el);
    }
    return true
  }
  
  @Patch()
  public async update(@Body() body: IProduct[]): Promise<IProduct[]> {
    const answer = [];
    for await (const el of body) {
      answer.push(await ProductService.update(el));
    }
    return answer;
  }
  
  @Delete("{id}")
  public async delete(id: string): Promise<boolean> {
    await ProductService.deleteById(Number(id))
    return true;
  }
}


export default new ProductController();


