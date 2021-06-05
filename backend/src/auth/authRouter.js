import Router from 'express'
import passport from "passport";
const router = new Router();
import "./passportConfig.js"
import session from 'express-session'
import SessionFileStore from 'session-file-store'
const FileStore = SessionFileStore(session);

router.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/api/posts");
    });
  })(req, res, next);
});



router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

export default router;