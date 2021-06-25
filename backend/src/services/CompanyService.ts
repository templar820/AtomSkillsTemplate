import {Company, Product} from "../models/DbModel";

class CompanyService {
  async create({name, address, products}) {
    return await Company.create({name, address, products}, {
        include: [{
          model: Product,
        }]
      }
    )
  }

}

export default new CompanyService()
