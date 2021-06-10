import passport from "passport";
import Router from 'express'
import "../auth/passportConfig.js"
import session from 'express-session'
import SessionFileStore from 'session-file-store'
const FileStore = SessionFileStore(session);
const authMiddleware = new Router();



authMiddleware.use(passport.initialize());
authMiddleware.use(passport.session());

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

const auth = (req, res, next) => {
    console.log("isAuthenticated", req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
};





export {
    auth,
    authMiddleware
}