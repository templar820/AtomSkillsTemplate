import {User} from "../models/User.js";
import bcrypt from 'bcrypt';

class UserService {
  async create(user) {
    const hashPassword = await this.getPassword(user.password)
    const newUser = await User.create({email: user.email, password: hashPassword})
    return newUser;
  }

  async loginUser(user){
    const dbUser = await User.findOne({ where: { email: user.email }});

    return await this.checkPassword(user.password, dbUser.password) ? dbUser : null;
  }

  getPassword = async (password) => await bcrypt.hash(password, 5)

  checkPassword = async (password, passwordHash) => await bcrypt.compare(password, passwordHash)

}

export default new UserService()
