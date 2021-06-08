import Router from 'express'
import ModelController from "./controllers/UserController.js";
import {asyncMiddleware} from "./middleware/asyncMiddleware.js";

const router = new Router();

router.post('/posts', asyncMiddleware(ModelController.create));
router.get('/posts', asyncMiddleware(ModelController.getAll));
router.get('/posts/:id', asyncMiddleware(ModelController.getOne));
router.put('/posts', asyncMiddleware(ModelController.update));
router.delete('/posts/:id', asyncMiddleware(ModelController.delete));

export default router;
