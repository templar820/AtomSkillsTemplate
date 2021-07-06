import {Substance, Product, ISubstance} from "../models/DbModel";

class ProductService {
  async create({name, code, products}: ISubstance) {
    return await Substance.create({name, code, products}, {
        include: [{
          model: Product,
        }]
      }
    )
  }

  async getAll() {
    return await Product.findAll( {
        include: [{
          model: Substance,
          as: Substance.name,
          attributes: ['id','name', 'code']
        }],
      }
    )
  }

}

export default new ProductService();
