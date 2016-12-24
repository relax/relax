import forEach from 'lodash/forEach';
import getBaseComponent from 'helpers/get-base-component';
import getDefaultFavicon from 'helpers/default-favicon';
import getSettings from 'helpers/get-settings';
import nodemailer from 'nodemailer';
import reducers from 'reducers/index.public.js';
import renderHtml from 'helpers/render-html';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/public';
import {Router} from 'express';
import {
  favicon,
  mailPass,
  mailService,
  mailTo,
  mailUser,
  webclip
} from 'statics/settings-keys';
import {getDataDependencies} from 'relate-js';
import {graphql} from 'graphql';

import MediaModel from '../models/media';
import schema from '../schema';

const publicRouter = new Router();

publicRouter.post('/send-email', async (req, res) => {
  const settingsIds = [
    mailService,
    mailUser,
    mailPass,
    mailTo
  ];
  const settings = await getSettings(settingsIds);
  const formData = req.body;

  let allSetup = true;
  forEach(settingsIds, (id) => {
    if (!settings[id]) {
      allSetup = false;
      return false;
    }
  });

  if (allSetup) {
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

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send();
    } catch (err) {
      res.status(500).send('Error sending email');
    }
  } else {
    res.status(500).send('Admin: setup not concluded');
  }
});

publicRouter.use('/', (req, res, next) => {
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/assets/public.js`
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
  res.locals.header.push({
    tag: 'link',
    props: {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/assets/public.css'
    }
  });

  routeHandler(routes, reducers, req, res, next);
});

publicRouter.use('/', async (req, res, next) => {
  if (req.routerState) {
    const settings = await getSettings([favicon, webclip]);

    // Favicon
    let iconLink = getDefaultFavicon(res);
    if (settings.favicon) {
      const faviconData = await MediaModel
        .findById(settings.favicon)
        .select('type url')
        .lean()
        .exec();

      if (faviconData) {
        iconLink = {
          tag: 'link',
          props: {
            rel: 'icon',
            type: faviconData.type,
            href: `${res.baseScriptsURL}/${faviconData.url}`
          }
        };
      }
    }
    res.locals.header.push(iconLink);

    // Webclip
    if (settings.webclip) {
      const webclipData = await MediaModel
        .findById(settings.webclip)
        .select('url')
        .lean()
        .exec();

      if (webclipData) {
        res.locals.header.push({
          tag: 'link',
          props: {
            rel: 'apple-touch-icon',
            href: `${res.baseScriptsURL}/${webclipData.url}`
          }
        });
      }
    }

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

export default publicRouter;
