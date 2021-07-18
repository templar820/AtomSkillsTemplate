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

  async get(offset, limit) {
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
