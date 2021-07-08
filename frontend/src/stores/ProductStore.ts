import { action, makeObservable, observable } from 'mobx';
import ProductModel from "@/model/ProductModel";

export default class ProductStore {
  @observable products: ProductModel[] | null = null;
  @observable count: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action addProducts = (array: any[]) => {
    const newProducts = array.map(obj => new ProductModel(obj));
    this.products = this.products
      ? [...this.products, ...newProducts]
      : newProducts;
  };

  @action setCount = (count: number) => {
    this.count = count;
  }

  @action clearProducts = () => {
    this.products = null;
  };
}
