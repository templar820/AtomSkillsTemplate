import {IProduct} from "./DbModel";


export default class Product implements IProduct{
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
  }
  
  id: string;
  name: string;
}