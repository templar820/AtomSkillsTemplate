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

const Company = db.define('company', {
  uuid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true,},
  address: {type: DataTypes.STRING, defaultValue: "Snaiperskaya 6-2-142"},
})

const Product = db.define('product', {
  name: {type: DataTypes.STRING, unique: true,},
  price: {type: DataTypes.FLOAT, defaultValue: 0},
})



Company.hasMany(Product, {foreignKey: 'fk_company_id', sourceKey: 'uuid'});
Product.belongsTo(Company, {foreignKey: 'fk_company_id', targetKey: 'uuid'});

// User.hasOne(UserDetails, {as: "user_details", foreignKey: 'fk_user_id', targetKey: 'id'});
// User.hasOne(UserDetails, {as: 'user_details'});
User.belongsTo(UserDetails, {as: 'user_details'});


export {
  User,
  UserDetails,
  Company,
  Product,
}
