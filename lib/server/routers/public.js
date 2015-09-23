import {Router} from 'express';
import forEach from 'lodash.foreach';
import stores from '../stores';
import publicRoutes from '../../routers/public';

var publicRouter = new Router();

publicRouter.use('/:slug*', (req, res, next) => {
  if (req.params.slug !== 'admin' && req.params.slug !== 'api') {
    res.locals.footer.push({
      tag: 'script',
      props: {
        src: '/js/public.js'
      }
    });
  }
  next();
});

forEach(publicRoutes, (routeInfo) => {
  publicRouter.get('/'+routeInfo.path, (req, res, next) => {
    routeInfo.callback(stores, res.render.bind(res, 'page/index.jsx'), {
      query: req.query,
      params: req.params,
      locals: res.locals
    }, next);
  });
});

export default publicRouter;
