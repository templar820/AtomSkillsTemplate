import session from 'express-session'
import SessionFileStore from 'session-file-store'
import passport from "passport";
import Router from 'express'
const FileStore = SessionFileStore(session);
const authMiddleware = new Router();



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





import '../auth/passportConfig.js'
authMiddleware.use(passport.initialize());
authMiddleware.use(passport.session());




const auth = async (req, res, next) => {
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