import express from 'express'
import router from "./router/router";
import authRouter from "./router/authRouter";
import {errorHandler} from "./middleware/errorHandler";
import fileUpload from 'express-fileupload';
import db from "./config/db";
import cors from 'cors';
import {auth, authMiddleware} from "./middleware/authMiddleware";
import {responseHandler} from "./middleware/responseHandler";
import SequelizeErd from 'sequelize-erd';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import logger from "./router/logger"
import {RegisterRoutes} from "./router/routes";






const PORT = process.env.BACKEND_PORT || 8080;

const app = express();
app.use(logger)



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(fileUpload({}));


// try{
//   await
//   await db.sync()
//
// } catch (e) {
//   console.log(e);
// }

app.get('/erd', (req, res) => {
  SequelizeErd({source: db}).then((erd: string) => {
    res.send(erd);
  });
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(responseHandler);

app.use(authMiddleware);
app.use('/api', authRouter);


app.use('/api', auth, router);


RegisterRoutes(app);


// Promise.all([db.authenticate(), db.sync()]).then(() => {
//   console.log("DB CONNECT")
//   app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
// });
app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));



