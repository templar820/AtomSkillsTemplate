import { action, makeObservable, observable } from 'mobx';
import ProductModel from "@/model/ProductModel";

export default class ProductStore {
  @observable products: ProductModel[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setProducts = (array: any[]) => {
    this.products = array.map(obj => new ProductModel(obj));
  };

  @action clearProducts = () => {
    this.products = null;
  };
}