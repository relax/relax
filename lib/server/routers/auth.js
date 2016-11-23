import getDefaultFavicon from 'helpers/default-favicon';
import getMarkup from 'helpers/get-markup';
import passport from 'passport';
import reducers from 'reducers';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/auth';
import {Router} from 'express';
import middleware from '../middleware';

const authRouter = new Router();

function injectScript (req, res, next) {
  res.locals.header.push({
    tag: 'link',
    props: {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
    }
  });
  if (process.env.NODE_ENV === 'production') {
    res.locals.header.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/assets/auth.css'
      }
    });
    res.locals.header.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/assets/common.js.css'
      }
    });
  }
  res.locals.header.push(getDefaultFavicon(res));
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/assets/auth.js`
    }
  });
  next();
}

authRouter.get(/^\/admin\/(login|init)$/, middleware.adminInit, (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    routeHandler(routes, reducers, req, res, next);
  }
});

// Logout
authRouter.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

// Register
authRouter.get('/admin/init', injectScript, async (req, res, next) => {
  if (req.relax.usersCount === 0) {
    return res.status(200).send(getMarkup(req.store, res));
  }
  next();
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.status(200).send(getMarkup(req.store, res));
  }
});

authRouter.post('/admin/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.status(500).send({
        error: 500,
        message: err.message
      });
    } else if (!user) {
      res.status(403).send({
        error: 403,
        message: 'Invalid username and password combination'
      });
    } else {
      req.logIn(user, (error) => {
        if (error) {
          res.status(500).send({
            error: 500,
            message: error.message
          });
        } else {
          res.status(200).end();
        }
      });
    }
  })(req, res, next);
});

export default authRouter;
