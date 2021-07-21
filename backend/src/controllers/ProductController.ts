import ProductService from "../services/ProductService";
import {Body, Controller, Delete, Get, Patch, Post, Query, Route, Security, Tags} from "tsoa"
import {IProduct} from "../models/Product";
import {ServerError} from "../middleware/errorHandler";
import es from "../config/es";

interface ProductsArea {
  offset: number;
  limit: number;
}



interface CreateProduct {
  name: string;
  substanceId: number;
}

interface UpdateProduct extends CreateProduct{
  id: number;
}

@Route("/products")
@Tags("Products")
@Security("api_key")
class ProductController extends Controller{
  @Post("/part")
  public async getPart(@Body() body: ProductsArea): Promise<{ products: IProduct[], count: number }> {
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
  public async insert(@Body() body: CreateProduct): Promise<IProduct> {
    const newProduct =  await ProductService.create(body);
    return this.getById(newProduct.id);
  }

  @Patch()
  public async update(@Body() body: UpdateProduct): Promise<IProduct[]> {
    const newProduct = await ProductService.update(body);
    return this.getById(newProduct.id);
  }

  @Delete("{id}")
  public async delete(id: string): Promise<boolean> {
    await ProductService.deleteById(Number(id))
    return true;
  }

  @Get("?product={name}&offset={start_index}&limit={count_items}")
  public async search(@Query("product") product: string, @Query("offset") offset?: number, @Query("limit") limit?: number): Promise<{ products: IProduct[], count: number }>{
  
    const result = await es.search({
      index: 'products',
      type: 'products',
      q: product,
      from: offset,
      size: limit
    })
    const es_count = await es.count({
      index: 'products',
      type: 'products',
      q: product,
    });
    return {
      products: await Promise.all(result.body.hits.hits.map(async (el) => await ProductService.getById(el._id))),
      count: es_count.body.count,
    }
  }
}


export default new ProductController();


