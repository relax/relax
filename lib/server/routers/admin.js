import getDefaultFavicon from 'helpers/default-favicon';
import getMarkup from 'helpers/get-markup';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/admin';
import {Router} from 'express';

const adminRouter = new Router();

// Restrict from here onwards
adminRouter.get('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.footer.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      }
    });
    res.locals.header.push(getDefaultFavicon(res));

    if (process.env.NODE_ENV === 'production') {
      res.locals.header.push({
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/css/admin.css'
        }
      });
    }

    res.locals.footer.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/js/admin.js`
      }
    });
    next();
  } else {
    res.redirect('/admin/login');
  }
});

adminRouter.get('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    routeHandler(routes, req, res, next);
  } else {
    next();
  }
});

adminRouter.get('/admin*', async (req, res, next) => {
  if (req.isAuthenticated() && req.routerState) {
    // const AdminContainer = req.routerState.components[0];
    // const PanelContainer = req.routerState.components[1];
    //
    // const {panelSettings, defaultQuery} = PanelContainer;
    // const queryVariables = Object.assign({}, defaultQuery, req.query);
    //
    // const paginateQuery = getQueryVariables(queryVariables);
    //
    // const {query, variables} = AdminContainer.getQueryAndVariables(
    //   {
    //     params: req.routerState.params,
    //     queryVariables: {
    //       ...paginateQuery
    //     }
    //   },
    //   {
    //     ...panelSettings
    //   }
    // );

    // const username = req.session.passport.user;
    // const user = await UserModel
    //   .findOne({username})
    //     .select({
    //       _id: 1,
    //       username: 1,
    //       name: 1,
    //       email: 1
    //     })
    //     .exec();

    // const data = await graphql(
    //   schema.getSchema(),
    //   query,
    //   {
    //     isAuthenticated: true,
    //     user
    //   },
    //   variables
    // );

    // await req.store.dispatch({
    //   type: graphqlActionType,
    //   ...data
    // });

    res.status(200).send(getMarkup(req.store, res));
  } else {
    next();
  }
});

export default adminRouter;
