import getBaseComponent from 'helpers/get-base-component';
import getDefaultFavicon from 'helpers/default-favicon';
import reducers from 'reducers';
import renderHtml from 'helpers/render-html';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/admin';
import {Router} from 'express';
import {getDataDependencies} from 'relate-js';
import {graphql} from 'graphql';

import schema from '../schema';

const adminRouter = new Router();

// Restrict from here onwards
adminRouter.get('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.footer.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
      }
    });
    res.locals.header.push(getDefaultFavicon(res));

    if (process.env.NODE_ENV === 'production') {
      res.locals.header.push({
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/assets/common.js.css'
        }
      });
      res.locals.header.push({
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/assets/admin.css'
        }
      });
    }

    res.locals.footer.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/assets/admin.js`
      }
    });
    next();
  } else {
    res.redirect('/admin/login');
  }
});

adminRouter.get('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    routeHandler(routes, reducers, req, res, next);
  } else {
    next();
  }
});

adminRouter.get('/admin*', async (req, res, next) => {
  if (req.isAuthenticated() && req.routerState) {
    // get component with redux provider and react router
    const component = getBaseComponent(req.store);

    // get relate js data dependencies
    await getDataDependencies(component, async (request) => await graphql(
      schema.getSchema(),
      request.query,
      {
        isAuthenticated: true,
        user: req.user
      },
      request.variables
    ));

    // final render html
    res.status(200).send(renderHtml({
      component,
      store: req.store,
      locals: res.locals
    }));
  } else {
    next();
  }
});

export default adminRouter;
