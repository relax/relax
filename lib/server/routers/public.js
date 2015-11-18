import forEach from 'lodash.foreach';
import path from 'path';
import {Router} from 'express';
import {graphql} from 'graphql';

import getMarkup from '../helpers/get-markup';
import resizeImage from '../helpers/resize-image';
import routeHandler from '../helpers/route-handler';
import routes from '../../routers/public';
import schema from '../schema';
import MediaModel from '../models/media';
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
    const PageContainer = req.routerState.components[0];

    console.log(req.routerState.params);
    const {query, variables} = PageContainer.getQueryAndVariables(
      {
        params: req.routerState.params
      }
    );
      console.log(query);
        console.log(variables);

    const data = await graphql(
      schema.getSchema(),
      query,
      {
        isAuthenticated: false,
        user: null
      },
      variables
    );

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
