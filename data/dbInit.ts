import mnn from "./productToMNN.json";
import {Product, Substance} from "../backend/src/models/DbModel.ts"



async function create({name, code, products}) {
  return await Substance.create({name, code, products}, {
      include: [{
        model: Product,
      }]
    }
  )
}

create({
  name: "Название вещества",
  code: "name_product_code",
  products: [{
    name: "Название продукта"
  }]
})

