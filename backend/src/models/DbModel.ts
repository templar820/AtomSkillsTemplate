import Sequelize from 'sequelize';
import db from "../db"

const DataTypes = Sequelize.DataTypes;

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
  name: {type: DataTypes.STRING, unique: true,},
})

const Substance = db.define('substance', {
  name: {type: DataTypes.STRING, unique: true,},
  code: {type: DataTypes.STRING, unique: true,},
})

Substance.hasMany(Product)
Product.belongsTo(Substance, {as: 'substance'});


// User.hasOne(UserDetails, {as: "user_details", foreignKey: 'fk_user_id', targetKey: 'id'});
// User.hasOne(UserDetails, {as: 'user_details'});
User.belongsTo(UserDetails, {as: 'user_details'});


export {
  User,
  UserDetails,
  Product,
  Substance
}
