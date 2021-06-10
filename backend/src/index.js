import express from 'express'
import router from "./router/router.js";
import authRouter from "./router/authRouter.js";
import {errorHandler} from "./middleware/errorHandler.js";
import fileUpload from 'express-fileupload';
import db from "./db.js"
import cors from 'cors';
import {auth, authMiddleware} from "./middleware/authMiddleware.js";


const PORT = process.env.BACKEND_PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(fileUpload({}));






try{
  await db.authenticate();
  await db.sync()
  console.log("DB CONNECT")
} catch (e) {
  console.log(e);
}




app.use(authMiddleware);
app.use('/api', authRouter);


app.use('/api', auth, router);

app.get('/', (req, res) => {
  console.log(req.session);
  res.send('HomePage');
});










app.use(errorHandler);
app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));