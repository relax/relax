import {Router} from 'express';
import multer from 'multer';
import forEach from 'lodash.foreach';
import mongoose from 'mongoose';
import mkdirp from 'mkdirp';
import path from 'path';
import fs from 'fs';
import Q from 'q';
import logger from '../../../logger';
import rmdir from 'rimraf';

var fontsApiRouter = new Router();

function fontUploaded(file, req, res){
  res.status(200).json(file).end();
}

fontsApiRouter.post('/api/fonts/upload',  [multer({
  dest: './uploads/',
  onFileUploadComplete: fontUploaded
}), (req, res, next) => {}]);


fontsApiRouter.post('/api/fonts/submit', (req, res, next) => {
  var files = JSON.parse(req.body.data);
  var promises = [];
  var id = mongoose.Types.ObjectId().toString();

  var root = path.join(__dirname, '../../../..');
  var fontsFolder = path.join(root, 'public/fonts', id);

  return Q
    .nfcall(mkdirp, fontsFolder)
    .then(() => {
      forEach(files, (file) => {
        let name = file.name;
        let info = file.info;

        promises.push(
          Q.ninvoke(fs, 'rename', path.join(root, info.path), path.join(fontsFolder, name))
        );
      });

      return Q.all(promises);
    })
    .then(() => {
      res.status(200).send(id);
    })
    .catch((error) => {
      logger.debug('Error submiting font: ', error);
      res.status(500).end();
    });
});


fontsApiRouter.post('/api/fonts/remove', (req, res, next) => {
  var id = req.body.id;

  var root = path.join(__dirname, '../../../..');
  var fontsFolder = path.join(root, 'public/fonts', id);

  return Q
    .nfcall(rmdir, fontsFolder)
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      logger.debug('Error removing font: ', error);
      res.status(500).end();
    });
});


export default fontsApiRouter;
