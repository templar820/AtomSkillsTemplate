export default class ProductModel {
  id: number;
  name: string;
  substanceName: string;
  substanceCode: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.substanceName = obj.substance?.name;
    this.substanceCode = obj.substance?.code;
  }
}
