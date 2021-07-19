import {Substance, Product} from "../models/DbModel";
import {IProduct} from "../models/Product";

class ProductService {
  async create({name, id, substance}: IProduct) {
    return await Product.create({name, id, [Substance.name]: {...substance}}, {
        include: [{
          model: Substance,
          as: Substance.name
        }]
      }
    )
  }

  async get(offset: number, limit: number) {
    return await Product.findAll({
      offset: offset,
      limit: limit,
      include: [{
        model: Substance,
        as: Substance.name,
        attributes: ['id', 'name', 'code']
      }],
    })
  }

  async getCount() {
    return await Product.count();
  }
  
  async getById(id: number){
    return await Product.findByPk(id)
  }

}

export default new ProductService();
