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
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

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

io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.emit('connection', 'Здарова отец');
});
app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(responseHandler);

app.use(authMiddleware);

app.use('/api', authRouter);

app.use('/api', auth, router);
app.use(errorHandler);

Promise.all([db.authenticate(), db.sync()]).then(() => {
  console.log('DB CONNECT');
  http.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT}`));
});
