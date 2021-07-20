import ProductService from "../services/ProductService";
import {Body, Controller, Delete, Get, Patch, Post, Query, Route, Security, Tags} from "tsoa"
import {IProduct} from "../models/Product";
import {ServerError} from "../middleware/errorHandler";
import es from "../config/es";

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
  
  @Get("?product=")
  public async search(@Query() product?: string): Promise<IProduct[]>{
    console.log(product);
    const result = await es.search({
      index: 'products',
      type: 'products',
      q: product
    })
    return await Promise.all(result.body.hits.hits.map(async (el) => await ProductService.getById(el._id)));
  }
}


export default new ProductController();


