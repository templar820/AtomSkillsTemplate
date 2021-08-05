import session from 'express-session';
import SessionFileStore from 'session-file-store';
import passport from 'passport';
import Router from 'express';

import '../config/passportConfig';

const FileStore = SessionFileStore(session);

const authMiddleware = Router();

authMiddleware.use(
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

authMiddleware.use(passport.initialize());
authMiddleware.use(passport.session());

const auth = passport.authenticate('jwt', { session: true });

export {
  auth,
  authMiddleware
};
