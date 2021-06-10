import express from 'express'
import router from "./router/router.js";
import authRouter from "./router/authRouter.js";
import {errorHandler} from "./middleware/errorHandler.js";
import fileUpload from 'express-fileupload';
import db from "./db.js"
import cors from 'cors';
import {authMiddleware} from "./middleware/authMiddleware.js";

const PORT = process.env.BACKEND_PORT || 8080;

const app = express();


try{
  await db.authenticate();
  await db.sync()
  console.log("success")
} catch (e) {
  console.log(e);
}


app.get('/', (req, res) => {
  console.log(req.session);
  res.send('HomePage');
});

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authMiddleware);
app.use('/api', authRouter);






app.use(express.static('static'));
app.use(fileUpload({}));
// app.use('/api', auth, router);
app.use(errorHandler);