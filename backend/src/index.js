import express from 'express'
import router from "./router.js";
import authRouter from "./auth/authRouter.js";
import {errorHandler} from "./middleware/errorHandler.js";
import fileUpload from 'express-fileupload';
import sequelize from "./dbInit.js"
import passport from 'passport';
// import session from 'express-session'
// import SessionFileStore from 'session-file-store'
// const FileStore = SessionFileStore(session);


const PORT = process.env.BACKEND_PORT || 8080;

const app = express();

//
// try{
//   await sequelize.authenticate();
//   console.log("success")
// } catch (e) {
//   console.log(e);
// }


app.get('/', (req, res) => {
  console.log(req.session);
  res.send('HomePage');
});

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRouter);

const auth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};


app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', auth, router);
app.use(errorHandler);