import {Product, Substance} from "../backend/src/models/DbModel"
import db from "../backend/src/db";
import substances from "./productToMNN.json";
// import db from "../backend/src/db"





async function createTransaction() {
  
  try {
    
    Product.destroy({
      where: {},
      cascade: true,
      truncate: true
    })
  
    Substance.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })
    
  } catch (error) {
    console.log(error);
  }
}

createTransaction();
