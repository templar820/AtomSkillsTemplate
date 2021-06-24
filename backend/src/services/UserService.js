import {User, UserDetails} from "../models/DbModel.js";
import bcrypt from 'bcrypt';

class UserService {
  async create({email, password, language = "RU"}) {
    const hashPassword = await this.getPassword(password)
    return await User.create({email, password: hashPassword, userDetails: {language}}, {
      include: {
        model: UserDetails,
        as: 'userDetails'
      }
    });

  }

  async loginUser(user){
    const dbUser = await User.findOne({ where: { email: user.email }});
    if (!dbUser) return null;

    return await this.checkPassword(user.password, dbUser.password) ? dbUser : null;
  }

  getPassword = async (password) => await bcrypt.hash(password, 5)

  checkPassword = async (password, passwordHash) => await bcrypt.compare(password, passwordHash)

}

export default new UserService()
