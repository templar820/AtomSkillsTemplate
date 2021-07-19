import substances from "./data/productToMNN.json";
import products from "./data/products.json";
import {Product, Substance} from "../backend/src/models/DbModel"
import db from "../backend/src/config/db"
import UserService from "../backend/src/services/UserService";

interface IProduct {
  id: string;
  name: string;
}

interface ISubstance {
  name: string;
  id: string;
  code: string;
  products: IProduct[];
}


function getProductById(id: string){
  const product = products.find(el => el.ID === id);
  if (product){
    return {id: product.ID, name: product.NAME};
  }
  return null;
}
async function createTransaction() {
  const t = await db.transaction();
  
  try {
    const substancesData = {} as ISubstance;
    substances.forEach(sub => {
      const values = substancesData[sub.MNN_ID as string];
      if (values){
        const data = getProductById(sub.PRODUCT_ID)
        if (data){
          values.products.push(data)
        }
      } else {
        const data = getProductById(sub.PRODUCT_ID)
        substancesData[sub.MNN_ID] = {
          id: sub.MNN_ID,
          name: sub.MNN_NAME,
          code: sub.MNN_CODE,
          products: data ? [data] : [],
        }
      }
    })
    for await ( const data of Object.values(substancesData)){
      await Substance.create(data, {
        transaction: t,
        include: [{
          model: Product,
        }]
      })
    }
    await UserService.create({email: "admin@admin", password: "admin", role: "ADMIN", language: "RU"})

    await t.commit();
    
  } catch (error) {
    
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    console.log(error);
    await t.rollback();
    
  }
}

createTransaction();







