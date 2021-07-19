import {ISubstance} from "./DbModel";

export interface IProduct {
  id: number;
  name: string;
  substance?: ISubstance
}



export default class Product implements IProduct{
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.substance = obj.substance;
  }

  
  id: string;
  name: string;
  substance?: ISubstance;
}