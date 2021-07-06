import Router from 'express'
import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import SubstancesController from "../controllers/SubstancesController";
import ProductController from "../controllers/ProductController";

const router = new Router();

router.get('/users', asyncMiddleware(UserController.getAll));
router.get('/users/userInfo', asyncMiddleware(UserController.getUserByToken));
router.get('/users/:id', asyncMiddleware(UserController.getOne));
router.put('/users', asyncMiddleware(UserController.update));
router.delete('/users/:id', asyncMiddleware(UserController.delete));

router.get('/substances', asyncMiddleware(SubstancesController.getAll));
router.post('/products', asyncMiddleware(ProductController.get));

export default router;
