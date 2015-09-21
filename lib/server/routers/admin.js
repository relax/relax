import {Router} from 'express';
import forEach from 'lodash.foreach';

import stores from '../stores';
import tabsStore from '../stores/tabs';

import adminRoutes from '../../routers/admin';

var adminRouter = new Router();

// Restrict from here onwards
adminRouter.use('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.header.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      }
    });
    res.locals.footer.push({
      tag: 'script',
      props: {
        src: '/js/admin.js'
      }
    });
    res.locals.user = req.user;
    res.locals.tabs = [];

    tabsStore
      .findAll({
        query: {
          userId: req.user._id
        },
        populate: {
          path: 'pageId',
          select: 'title slug'
        }
      })
      .then((tabs) => {
        res.locals.tabs = tabs;
      })
      .fin(() => {
        return next();
      });
  } else {
    res.redirect('/admin/login');
  }
});

// Logout
adminRouter.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

// Client/Server routes iteration
forEach(adminRoutes, (routeInfo) => {
  adminRouter.get('/'+routeInfo.path, (req, res, next) => {
    routeInfo.callback(stores, res.render.bind(res, 'admin/index.jsx'), {
      query: req.query,
      params: req.params,
      locals: res.locals
    }, next);
  });
});


export default adminRouter;
