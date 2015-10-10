import {Router} from 'express';
import forEach from 'lodash.foreach';
import nodemailer from 'nodemailer';
import publicRoutes from '../../routers/public';
import mailSettingsIds from '../../settings/mail';

var publicRouter = new Router();

publicRouter.post('/send-email', (req, res, next) => {

});

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
    routeInfo.callback(res.render.bind(res, 'page/index.jsx'), {
      query: req.query,
      params: req.params,
      locals: res.locals
    }, next);
  });
});

export default publicRouter;
