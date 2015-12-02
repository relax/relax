import find from 'lodash.find';
import forEach from 'lodash.foreach';
import nodemailer from 'nodemailer';
import path from 'path';
import {Router} from 'express';
import {graphql} from 'graphql';

import getDefaultFavicon from '../helpers/default-favicon';
import getMarkup from '../helpers/get-markup';
import parseSettings from '../../helpers/parse-settings';
import resizeImage from '../helpers/resize-image';
import routeHandler from '../helpers/route-handler';
import routes from '../../routers/public';
import schema from '../schema';
import MediaModel from '../models/media';
import SettingModel from '../models/setting';
import {getAdmin as getAdminActionType} from '../../client/actions/types';

var publicRouter = new Router();

publicRouter.get('/api/media/resize/:mediaId/:width/:height', async (req, res, next) => {
  try {
    const {mediaId: id} = req.params;
    var {width, height} = req.params;

    width = parseInt(width, 10);
    height = parseInt(height, 10);

    const media = await MediaModel
      .findById(id)
      .select({
        dimension: 1,
        variations: 1,
        fileName: 1,
        absoluteUrl: 1
      })
      .exec();

    if (!media) {
      throw new Error('Media not found');
    }

    if (!media.dimension) {
      throw new Error('Media file is not an image');
    }

    const relativePath = path.join('media', id);
    const mediaPath = path.join(__dirname, '../../../public', relativePath);
    const originalRatio = media.dimension.width / media.dimension.height;

    var resultWidth = Math.ceil(width / 100) * 100;
    var resultHeight = resultWidth / originalRatio;

    if (resultHeight < height) {
      resultHeight = Math.ceil(height / 100) * 100;
      resultWidth = resultHeight * originalRatio;
    }

    resultWidth = Math.round(resultWidth);
    resultHeight = Math.round(resultHeight);

    const filename = `${resultWidth}x${resultHeight}-${media.fileName}`;
    const filePath = path.join(mediaPath, filename);

    var variation;
    // Check if variation already exists
    forEach(media.variations, (_variation) => {
      const {dimension: {width: _width, height: _height}} = _variation;
      if (_width === resultWidth && _height === resultHeight) {
        variation = _variation;
        return false;
      }
    });

    if (!variation) {
      await resizeImage(media.absoluteUrl, filePath, {
        width: resultWidth,
        height: resultHeight,
        quality: 100
      });

      variation = {
        url: path.join(relativePath, filename),
        absoluteUrl: path.join(mediaPath, filename),
        dimension: {
          width: resultWidth,
          height: resultHeight
        }
      };

      media.variations.push(variation);

      await media.save();
    }

    res.sendFile(variation.absoluteUrl);
  } catch (error) {
    next(error);
  }
});

publicRouter.post('/send-email', async (req, res, next) => {
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
      src: `${res.baseScriptsURL}/js/public.js`
    }
  });
  res.locals.header.push({
    tag: 'link',
    props: {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/css/public.css'
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
      .exec();
    const settings = parseSettings(settingsArr);

    let iconLink = getDefaultFavicon(res);
    if (settings.favicon) {
      const favicon = await MediaModel
        .findById(settings.favicon)
        .select('type url')
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

    if (settings.webclip) {
      const webclip = await MediaModel
        .findById(settings.webclip)
        .select('url')
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

    const PageContainer = req.routerState.components[0];

    const {query, variables} = PageContainer.getQueryAndVariables(
      {
        params: req.routerState.params
      }
    );

    const data = await graphql(
      schema.getSchema(),
      query,
      {
        isAuthenticated: false,
        user: null
      },
      variables
    );

    if (data && data.data && data.data.page && data.data.page.title) {
      const titleTag = find(res.locals.header, 'tag', 'title');
      titleTag.content += ' - ' + data.data.page.title;
    }

    await req.store.dispatch({
      type: getAdminActionType,
      ...data
    });

    res.status(200).send(getMarkup(req.store, res));
  } else {
    next();
  }
});

export default publicRouter;
