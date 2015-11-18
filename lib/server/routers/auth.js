import passport from 'passport';
import {Router} from 'express';

import getMarkup from '../helpers/get-markup';
import routeHandler from '../helpers/route-handler';
import routes from '../../routers/auth';
import UserModel from '../models/user';

const authRouter = new Router();

function injectScript (req, res, next) {
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/js/auth.js`
    }
  });
  next();
}

authRouter.get(/^\/admin\/(login|init)$/, (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    routeHandler(routes, req, res, next);
  }
});

// Register
authRouter.get('/admin/init', injectScript, async (req, res, next) => {
  try {
    const count = await UserModel.count().exec();
    if (count === 0) {
      res.status(200).send(getMarkup(req.store, res));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.status(200).send(getMarkup(req.store, res));
  }
});

authRouter.post('/admin/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/admin');
});

export default authRouter;
