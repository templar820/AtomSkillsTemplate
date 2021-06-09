import {User} from "../models/User.js";
import bcrypt from 'bcrypt';

class UserService {
  async create(user) {
    const hashPassword = await bcrypt.hash(password, 5)
    const newUser = await User.create({email, role, password: hashPassword})
    return newUser;
  }

  async getAll() {
    // const posts = await Post.find();
    return "posts";
  }
  async getOne(id) {
    if (!id) {
      throw new Error('не указан ID')
    }
    // const post = await Post.findById(id);
    return "post";
  }

  async update(post) {
    if (!post._id) {
      throw new Error('не указан ID')
    }
    // const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
    return "updatedPost";
  }

  async delete(id) {
    if (!id) {
      throw new Error('не указан ID')
    }
    // const post = await Post.findByIdAndDelete(id);
    return "post";
  }
}

export default new UserService()