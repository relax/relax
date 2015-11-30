import passport from 'passport';
import {Router} from 'express';

import getDefaultFavicon from '../helpers/default-favicon';
import getMarkup from '../helpers/get-markup';
import routeHandler from '../helpers/route-handler';
import routes from '../../routers/auth';
import UserModel from '../models/user';

const authRouter = new Router();

function injectScript (req, res, next) {
  res.locals.header = res.locals.header.concat([
    {
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      }
    },
    {
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/auth.css'
      }
    }
  ]);
  res.locals.header.push(getDefaultFavicon(res));
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

// Logout
authRouter.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
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
