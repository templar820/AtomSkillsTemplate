import {ServerError} from "../middleware/errorHandler";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken";

class UserController {
  async create(req, res) {
    const {email, id} = await UserService.create(req.body);
    const token = jwt.sign({email, id}, process.env.SECRET_KEY || 'hacktemplate');
    return res.sendFormat({token});
  }

  async getAll(req, res) {
    const users = await UserService.getAll();
    return res.sendFormat(users);
  }

  async getOne(req, res) {
    const post = await UserService.getOne(req.params.id)
    if (!post) throw new ServerError(404, 'User not found');
    return res.sendFormat(post)
  }

  async getUserByToken(req, res) {
    const post = await UserService.getOne(req.user)
    if (!post) throw new ServerError(404, 'User not found');
    return res.sendFormat(post)
  }

  async update(req, res) {
    const updatedPost = await UserService.update(req.body);
    return res.sendFormat(updatedPost);
  }

  async delete(req, res) {
    const post = await UserService.create(req.params.id);
    return res.sendFormat(post);
  }
}


export default new UserController();

