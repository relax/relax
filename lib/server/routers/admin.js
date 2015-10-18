import {Router} from 'express';
import {graphql} from 'graphql';
import qs from 'query-string';
import {match, reduxReactRouter} from 'redux-router/server';

import schema from '../schema';
import getMarkup from '../helpers/get-markup';
import UserModel from '../models/user';

import {getAdmin as getAdminActionType} from '../../actions/types';
import configureStore from '../../helpers/configure-store';
import routes from '../../client/routers/admin';

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
    next();
  } else {
    res.redirect('/admin/login');
  }
  //   res.locals.user = req.user;
  //   res.locals.tabs = [];
  //
});

// Logout
adminRouter.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

adminRouter.use((req, res, next) => {
  const store = configureStore(reduxReactRouter({routes}));
  const urlQuery = qs.stringify(req.query);
  const url = req.path + (urlQuery.length ? '?' + urlQuery : '');

  store.dispatch(match(url, async (error, redirectLocation, routerState) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (routerState) {
      const AdminContainer = routerState.components[0];

      const {query, variables} = AdminContainer.getQueryAndVariables({
        params: routerState.params
      }, {
        activePanelType: 'settings',
        ...AdminContainer.getParams({
          location: routerState.location,
          routes: routerState.routes
        })
      });

      const username = req.session.passport.user;
      const user = await UserModel
        .findOne({username})
          .select({
            _id: 1,
            username: 1,
            name: 1,
            email: 1
          })
          .exec();

      const data = await graphql(
        schema.getSchema(),
        query,
        {
          isAuthenticated: true,
          user
        },
        variables
      );

      await store.dispatch({
        type: getAdminActionType,
        ...data
      });

      res.status(200).send(getMarkup(store, res));
    } else {
      res.status(404).send('Not found');
    }
  }));
});

export default adminRouter;
