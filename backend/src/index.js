import express from 'express'
import router from "./router.js";
import {errorHandler} from "./middleware/errorHandler.js";
import fileUpload from 'express-fileupload';
import sequelize from "./dbInit.js"
// import passport from 'passport';
// import session from 'express-session'
// import RedisStore from 'connect-redis'


const PORT = process.env.BACKEND_PORT;

const app = express()
console.log(11111111111111111111111111111111);


try{
  await sequelize.authenticate();
  console.log("success")
} catch (e) {
  console.log(e);
}




app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
// app.use(session({
//   store: new RedisStore({
//     url: config.redisStore.url
//   }),
//   secret: config.redisStore.secret,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())


app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);