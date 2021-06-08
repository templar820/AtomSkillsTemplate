import {ServerError} from "../middleware/errorHandler.js";
import UserService from "../services/UserService.js";

class UserController {
  async create(req, res) {
    const user = await UserService.create(req.body, req.files.picture)
    res.json(user)
  }

  async getAll(req, res) {
    // const posts = await PostService.getAll();
    return res.json("Привет");
  }

  async getOne(req, res) {
    const post = await PostService.getOne(req.params.id)
    if (!post) throw new ServerError(404, 'Post not found');
    return res.json(post)
  }

  async update(req, res) {
    const updatedPost = await PostService.update(req.body);
    return res.json(updatedPost);
  }

  async delete(req, res) {
    const post = await PostService.create(req.params.id);
    return res.json(post);
  }
}


export default new UserController();

