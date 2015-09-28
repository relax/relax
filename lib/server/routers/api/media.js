import {Router} from 'express';
import mediaStore from '../../stores/media';
import multer from 'multer';
import filesize from 'file-size';
import fs from 'fs';
import sharp from 'sharp';
import Q from 'q';
import path from 'path';
import mkdirp from 'mkdirp';
import mongoose from 'mongoose';
import logger from '../../../logger';
import rmdir from 'rimraf';
import forEach from 'lodash.foreach';

var mediaApiRouter = new Router();
var upload = multer({ dest: './uploads/' });

function fileUploaded(file, req, res) {
  var id = mongoose.Types.ObjectId();
  var idString = id.toString();

  var folder = path.join(__dirname, '../../../../public/images', idString);
  var relativePath = path.join('/images', idString, '/');

  var absoluteUrl = path.join(folder, file.originalname);
  var relativeUrl = relativePath+file.originalname;

  Q
    .nfcall(mkdirp, folder)
    .then(() => {
      return Q.ninvoke(fs, 'rename', file.path, absoluteUrl);
    })
    .then(() => {
      return Q.fcall(sharp, absoluteUrl);
    })
    .then((image) => {
      return Q.all([
        image,
        Q.ninvoke(image, 'metadata')
      ]);
    })
    .spread((image, metadata) => {
      return Q.all([
        metadata,
        Q.ninvoke(image.quality(100).resize(100, 100), 'toFile', folder+'/thumbnail.'+metadata.format)
      ]);
    })
    .spread((metadata, thumbnailInfo) => {
      let mediaItem = {
        _id: id,
        name: file.originalname,
        fileName: file.originalname,
        type: file.mimetype,
        size: filesize(file.size).human(),
        filesize: file.size,
        dimension: {
          width: metadata.width,
          height: metadata.height
        },
        url: relativeUrl,
        absoluteUrl: absoluteUrl,
        thumbnail: relativePath+'thumbnail.'+metadata.format,
        variations: []
      };

      return mediaStore.add(mediaItem);
    })
    .then((mediaItem) => {
      res.status(200).send(mediaItem);
    })
    .catch((err) => {
      logger.debug('Error uploading media: ', err);
      res.status(500).send('An error occurred while uploading the image');
    });
}

function getOrCreateVariation (options) {
  const mediaId = options.id;
  const width = options.width;
  const height = options.height;

  const folder = path.join(__dirname, '../../../../public/images', mediaId);
  const relativePath = path.join('/images', mediaId);

  return Q()
    .then(() => mediaStore.findById(mediaId))
    .then((media) => {
      if (width === 0 && height === 0) {
        return {media};
      }

      var originalRatio = media.dimension.width / media.dimension.height;
      var resultWidth = Math.ceil(width/100) * 100;
      var resultHeight = resultWidth / originalRatio;

      if (resultHeight < height) {
        resultHeight = Math.ceil(height/100) * 100;
        resultWidth = resultHeight * originalRatio;
      }

      resultWidth = Math.round(resultWidth);
      resultHeight = Math.round(resultHeight);

      var filename = resultWidth+'x'+resultHeight+'-'+media.fileName;
      var filePath = path.join(folder, filename);

      // Check if variation already exists
      var variation = false;
      forEach(media.variations, (_variation) => {
        if (_variation.dimension.width === resultWidth && _variation.dimension.height === resultHeight) {
          variation = _variation;
          return false;
        }
      });

      if (variation !== false) {
        return {
          media,
          variation
        };
      }

      // Create
      return Q()
        .then(() => Q.fcall(sharp, media.absoluteUrl))
        .then((image) => Q.ninvoke(image.quality(100).resize(resultWidth, resultHeight), 'toFile', filePath))
        .then((info) => {
          info = info[0];

          variation = {
            url: path.join(relativePath, filename),
            absoluteUrl: path.join(folder, filename),
            dimension: {
              width: info.width,
              height: info.height
            }
          };

          media.variations.push(variation);

          return mediaStore.update(mediaId, media);
        })
        .then((media) => {
          return {
            media,
            variation
          };
        });
    });
}

mediaApiRouter.post('/api/media/upload', upload.single('file'), (req, res, next) => {
  if (req.file) {
    fileUploaded(req.file, req, res);
  }
});

mediaApiRouter.get('/api/media', (req, res, next) => {
  mediaStore
    .findAll(req.query)
    .then((media) => {
      res.status(200).send(media);
    })
    .catch(next);
});

mediaApiRouter.get('/api/media/resized/:id', (req, res, next) => {
  var id = req.params.id;
  var width = parseInt(req.query.width, 10);
  var height = parseInt(req.query.height, 10);

  getOrCreateVariation({
      id,
      width,
      height
    })
    .then((info) => {
      res.sendFile(info.variation && info.variation.absoluteUrl || info.media.absoluteUrl);
    })
    .catch(next);
});

mediaApiRouter.get('/api/media/resize', (req, res, next) => {
  var id = req.query.id;
  var width = parseInt(req.query.width, 10);
  var height = parseInt(req.query.height, 10);

  getOrCreateVariation({
      id,
      width,
      height
    })
    .then((info) => {
      res.status(200).send(info.media);
    })
    .catch(next);
});

mediaApiRouter.get('/api/media/count', (req, res, next) => {
  mediaStore
    .count({})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

mediaApiRouter.get('/api/media/:id', (req, res, next) => {
  var mediaId = req.params.id;

  mediaStore
    .findById(mediaId)
    .then((media) => {
      res.status(200).send(media);
    })
    .catch(next);
});

mediaApiRouter.post('/api/media',  (req, res, next) => {
  mediaStore
    .add(req.body)
    .then((media) => {
      res.status(200).send(media);
    })
    .catch(next);
});

mediaApiRouter.put('/api/media/:id',  (req, res, next) => {
  var mediaId = req.params.id;

  mediaStore
    .update(mediaId, req.body)
    .then((media) => {
      res.status(200).send(media);
    })
    .catch(next);
});

mediaApiRouter.delete('/api/media/:id',  (req, res, next) => {
  var mediaId = req.params.id;
  var folder = path.join(__dirname, '../../../../public/images', mediaId);

  Q
    .nfcall(rmdir, folder)
    .then(() => mediaStore.remove(mediaId))
    .then((media) => res.status(200).send(media))
    .catch(next);
});

export default mediaApiRouter;
