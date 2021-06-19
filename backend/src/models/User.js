import Sequelize from 'sequelize';
import db from "../db.js"

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


User.hasOne(UserDetails, {foreignKey: 'fk_user_id', targetKey: 'id'});


export {
  User,
  UserDetails
}
