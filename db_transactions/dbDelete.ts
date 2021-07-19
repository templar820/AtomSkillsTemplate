import {Product, Substance, User, UserDetails} from "../backend/src/models/DbModel"
import es from "../backend/src/config/es";





async function createTransaction() {
  
  try {
    
    Product.destroy({
      where: {},
      cascade: true,
      truncate: true
    })
    
    await es.indices.delete({
      index: "products",
    });
  
    Substance.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })
  
    User.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })
    
    UserDetails.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })
    
  } catch (error) {
    console.log(error);
  }
}

createTransaction();
