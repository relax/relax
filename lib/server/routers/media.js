import forEach from 'lodash.foreach';
import path from 'path';
import resizeImage from 'helpers/resize-image';
import {Router} from 'express';

import MediaModel from '../models/media';

const mediaRouter = new Router();

mediaRouter.get('/api/media/resize/:mediaId/:width/:height', async (req, res, next) => {
  try {
    const {mediaId: id} = req.params;
    let {width, height} = req.params;

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
    const mediaPath = path.join('.', 'public', relativePath);
    const originalRatio = media.dimension.width / media.dimension.height;

    let resultWidth = Math.ceil(width / 100) * 100;
    let resultHeight = resultWidth / originalRatio;

    if (resultHeight < height) {
      resultHeight = Math.ceil(height / 100) * 100;
      resultWidth = resultHeight * originalRatio;
    }

    resultWidth = Math.round(resultWidth);
    resultHeight = Math.round(resultHeight);

    const filename = `${resultWidth}x${resultHeight}-${media.fileName}`;
    const filePath = path.join(mediaPath, filename);

    let variation;
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

    res.sendFile(variation.absoluteUrl, {root: '.'});
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
