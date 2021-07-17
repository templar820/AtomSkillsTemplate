import Sequelize from 'sequelize';
import db from "../config/db"
import es from "../config/es";

const DataTypes = Sequelize.DataTypes;

const saveDocument = (instance) => {
  return es.create({
    index: 'products',
    type: 'products',
    id: instance.dataValues.id,
    body: { name: instance.dataValues.name },
  });
}

const deleteDocument = (instance) => {
  console.log("delete document");
  return es.delete({
    index: 'products',
    type: 'products',
    id: instance.dataValues.id,
  });
}

const User = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const UserDetails = db.define('user_details', {
  language: {type: DataTypes.STRING},
})


const Product = db.define('products', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING,},
}, {
  hooks: {
    afterCreate: saveDocument,
    afterDestroy: deleteDocument
  }
})



const Substance = db.define('substance', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  code: {type: DataTypes.STRING},
})

Substance.hasMany(Product)
Product.belongsTo(Substance, {as: 'substance'});


// User.hasOne(UserDetails, {as: "user_details", foreignKey: 'fk_user_id', targetKey: 'id'});
// User.hasOne(UserDetails, {as: 'user_details'});
User.belongsTo(UserDetails, {as: 'user_details'});

export interface IProduct {
  id: string;
  name: string;
}

export interface ISubstance {
  name: string;
  id: string;
  code: string;
}




export {
  User,
  UserDetails,
  Product,
  Substance
}
