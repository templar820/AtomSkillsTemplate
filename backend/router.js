import Router from 'express'
import ModelController from "./controllers/ModelController.js";

const router = new Router()

router.post('/posts', ModelController.create)
router.get('/posts', ModelController.getAll)
router.get('/posts/:id', ModelController.getOne)
router.put('/posts', ModelController.update)
router.delete('/posts/:id', ModelController.delete)

export default router;
