import {Substance, Product} from "../models/DbModel";
import {IProduct} from "../models/Product";
import db from "../config/db";
import {ServerError} from "../middleware/errorHandler";

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
  
  
  async update({name, id, substance}: IProduct) {
    const t = await db.transaction();
    try {
      await Product.update({id, name}, {
        transaction: t,
        where:{
          id,
        }
      })
      await Substance.update(substance, {
        transaction: t,
        where: {
          id: substance?.id,
        }
      })
      await t.commit()
      return Product.findOne({
        where:{
          id,
        },
        include:[{
          model: Substance,
          as: Substance.name,
          attributes: ['id', 'name', 'code']
        }],
      })
    } catch (e) {
      throw new ServerError(500, e.message);
    }
  }
  
  
  async getPart(offset: number, limit: number) {
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
  
  async deleteById(id: number){
    return await Product.destroy({
      where: {id},
    })
  }
  
  

}

export default new ProductService();
