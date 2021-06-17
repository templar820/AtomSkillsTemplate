import {ServerError} from "../middleware/errorHandler.js";
import UserService from "../services/UserService.js";

class UserController {
  async create(req, res) {
    const user = await UserService.create(req.body)
    res.sendFormat(user)
  }

  async getAll(req, res) {
    // const posts = await PostService.getAll();
    return res.sendFormat({hi: "привет"});
  }

  async getOne(req, res) {
    const post = await PostService.getOne(req.params.id)
    if (!post) throw new ServerError(404, 'Post not found');
    return res.sendFormat(post)
  }

  async update(req, res) {
    const updatedPost = await PostService.update(req.body);
    return res.sendFormat(updatedPost);
  }

  async delete(req, res) {
    const post = await PostService.create(req.params.id);
    return res.sendFormat(post);
  }
}


export default new UserController();

