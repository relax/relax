import forEach from 'lodash.foreach';
import getBaseComponent from 'helpers/get-base-component';
import getDefaultFavicon from 'helpers/default-favicon';
import nodemailer from 'nodemailer';
import parseSettings from 'helpers/parse-settings';
import renderHtml from 'helpers/render-html';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/public';
import {Router} from 'express';
import {graphql} from 'graphql';
import {getDataDependencies} from 'relate-js';

import schema from '../schema';
import MediaModel from '../models/media';
import SettingModel from '../models/setting';

const publicRouter = new Router();

publicRouter.post('/send-email', async (req, res) => {
  const settingsIds = [
    'mailService',
    'mailUser',
    'mailPass',
    'mailTo'
  ];
  const settingsArr = await SettingModel
    .find({
      _id: {
        $in: settingsIds
      }
    })
    .exec();

  const settings = parseSettings(settingsArr);
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
      href: '/assets/public.css'
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
  routeHandler(routes, req, res, next);
});

publicRouter.use('/', async (req, res, next) => {
  if (req.routerState) {
    const settingsArr = await SettingModel
      .find({
        _id: {$in: ['favicon', 'webclip']}
      })
      .lean()
      .exec();
    const settings = parseSettings(settingsArr);

    // Favicon
    let iconLink = getDefaultFavicon(res);
    if (settings.favicon) {
      const favicon = await MediaModel
        .findById(settings.favicon)
        .select('type url')
        .lean()
        .exec();

      if (favicon) {
        iconLink = {
          tag: 'link',
          props: {
            rel: 'icon',
            type: favicon.type,
            href: `${res.baseScriptsURL}/${favicon.url}`
          }
        };
      }
    }
    res.locals.header.push(iconLink);

    // Webclip
    if (settings.webclip) {
      const webclip = await MediaModel
        .findById(settings.webclip)
        .select('url')
        .lean()
        .exec();

      if (webclip) {
        res.locals.header.push({
          tag: 'link',
          props: {
            rel: 'apple-touch-icon',
            href: `${res.baseScriptsURL}/${webclip.url}`
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
