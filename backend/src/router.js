import Router from 'express'
import UserController from "./controllers/UserController.js";
import {asyncMiddleware} from "./middleware/asyncMiddleware.js";

const router = new Router();

router.post('/user/register', asyncMiddleware(UserController.create));
router.get('/posts', asyncMiddleware(UserController.getAll));
router.get('/posts/:id', asyncMiddleware(UserController.getOne));
router.put('/posts', asyncMiddleware(UserController.update));
router.delete('/posts/:id', asyncMiddleware(UserController.delete));

export default router;
