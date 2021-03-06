import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import ProductService from '../services/ProductService';
import { IProduct } from '../models/Product';
import { ServerError } from '../middleware/errorHandler';

interface ProductsArea {
  offset: number;
  limit: number;
}

interface SearchArea extends ProductsArea {
  query: string;
}

interface CreateProduct {
  name: string;
  substanceId: number;
}

interface UpdateProduct extends CreateProduct{
  id: number;
}

@Route('/products')
@Tags('Products')
@Security('api_key')
class ProductController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  @Post('/part')
  public async getPart(@Body() body: ProductsArea): Promise<{ products: IProduct[], count: number }> {
    const products = await ProductService.getPart(body.offset, body.limit);
    const count = await ProductService.getCount();
    return { products, count };
  }

  @Get('{id}')
  public async getById(id: number) : Promise<IProduct> {
    const product = await ProductService.getById(id);
    if (!product) throw new ServerError(500, 'Сущность не найдена');
    return product;
  }

  @Post()
  public async insert(@Body() body: CreateProduct): Promise<IProduct> {
    const newProduct = await ProductService.create(body);
    return this.getById(newProduct.id);
  }

  @Patch()
  public async update(@Body() body: UpdateProduct): Promise<IProduct[]> {
    const newProduct = await ProductService.update(body);
    return this.getById(newProduct.id);
  }

  @Delete('{id}')
  public async delete(id: string): Promise<boolean> {
    await ProductService.deleteById(Number(id));
    return true;
  }

  @Post('/search')
  public async search(@Body() body: SearchArea): Promise<{ products: IProduct[], count: number }> {
    return Promise.resolve(true);
  }
}

export default new ProductController();
