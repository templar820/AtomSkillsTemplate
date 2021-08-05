import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import SequelizeErd from 'sequelize-erd';
import swaggerUi from 'swagger-ui-express';
import router from './routes/router';
import authRouter from './routes/authRouter';
import { errorHandler } from './middleware/errorHandler';
import db from './config/db';
import { auth, authMiddleware } from './middleware/authMiddleware';
import { responseHandler } from './middleware/responseHandler';
import swaggerDocument from '../swagger.json';
import logger from './middleware/logger';

const PORT = process.env.BACKEND_PORT || 8080;

const app = express();
app.use(logger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(fileUpload({}));

app.get('/erd', (req, res) => {
  SequelizeErd({ source: db }).then((erd: string) => {
    res.send(erd);
  });
});

// app.use((req, res, next) => {
//   // mySuperSingleTon
//   // inversify req, res => inversify Надо сделать BaseController Относледовать от TSOA далее в него заинджектить req, res, и протестировать генерацию сваггера
//   next();
// });

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(responseHandler);

app.use(authMiddleware);

app.use('/api', authRouter);

app.use('/api', auth, router);
app.use(errorHandler);

Promise.all([db.authenticate(), db.sync()]).then(() => {
  console.log('DB CONNECT');
  app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT}`));
});
