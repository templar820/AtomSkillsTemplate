export default class UserModel {
  id;
  name;
  gender;
  
  constructor(obj) {
    this.id = obj?.id || null;
    this.name = obj?.name || null;
    this.gender = obj?.gender;
  }
}