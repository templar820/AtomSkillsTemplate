import Router from 'express'
import UserController from "../controllers/UserController";
import {asyncMiddleware} from "../middleware/asyncMiddleware";
import CompanyController from "../controllers/CompanyController";

const router = new Router();


router.get('/users', asyncMiddleware(UserController.getAll));
router.post('/users/userInfo', asyncMiddleware(UserController.getUserByToken));//get
router.get('/users/:id', asyncMiddleware(UserController.getOne));
router.put('/users', asyncMiddleware(UserController.update));
router.delete('/users/:id', asyncMiddleware(UserController.delete));

router.get('/companies', asyncMiddleware(CompanyController.getAll));
router.get('/companies/:id', asyncMiddleware(CompanyController.getOne));
router.put('/companies', asyncMiddleware(CompanyController.update));
router.delete('/companies/:id', asyncMiddleware(CompanyController.delete));
router.post('/companies', asyncMiddleware(CompanyController.create));

export default router;
