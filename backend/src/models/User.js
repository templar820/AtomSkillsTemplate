import Sequelize from 'sequelize';
import db from "../db.js"

const DataTypes = Sequelize.DataTypes;

const User = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
})



export {
  User,
}