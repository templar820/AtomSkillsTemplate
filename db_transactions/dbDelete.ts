import {Product, Substance, User, UserDetails} from "./backend/src/models/DbModel"





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
