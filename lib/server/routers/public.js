import {Router} from 'express';
import forEach from 'lodash.foreach';
import nodemailer from 'nodemailer';
import stores from '../stores';
import publicRoutes from '../../routers/public';
import mailSettingsIds from '../../settings/mail';

var publicRouter = new Router();

publicRouter.post('/send-email', (req, res, next) => {
  stores.settings
    .findByIds(mailSettingsIds)
    .then((settings) => {
      settings = stores.settings.parseSettings(settings);

      const formData = req.body;
      console.log(formData);
      const transporter = nodemailer.createTransport({
        service: settings.mailService,
        auth: {
          user: settings.mailUser,
          pass: settings.mailPass
        }
      });
      const mailOptions = {
        from: formData.from,
        to: settings.mailTo,
        subject: formData.subject,
        html: formData.message
      };

      return transporter.sendMail(mailOptions);
    })
    .then((info) => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send();
    });
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
    routeInfo.callback(stores, res.render.bind(res, 'page/index.jsx'), {
      query: req.query,
      params: req.params,
      locals: res.locals
    }, next);
  });
});

export default publicRouter;
