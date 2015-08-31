import {Router} from 'express';
import stylesStore from '../../stores/styles';

var styleApiRouter = new Router();

styleApiRouter.get('/api/style', (req, res, next) => {
  var options = {
    query: req.query
  };
  stylesStore
    .findAll(options)
    .then((styles) => {
      res.status(200).send(styles);
    })
    .catch(next);
});

styleApiRouter.get('/api/style/:id', (req, res, next) => {
  var styleId = req.params.id;

  stylesStore
    .findById(styleId)
    .then((style) => {
      res.status(200).send(style);
    })
    .catch(next);
});

styleApiRouter.post('/api/style',  (req, res, next) => {
  stylesStore
    .add(req.body)
    .then((style) => {
      res.status(200).send(style);
    })
    .catch(next);
});

styleApiRouter.put('/api/style/:id',  (req, res, next) => {
  var styleId = req.params.id;

  stylesStore
    .update(styleId, req.body)
    .then((style) => {
      res.status(200).send(style);
    })
    .catch(next);
});

styleApiRouter.delete('/api/style/:id',  (req, res, next) => {
  var styleId = req.params.id;

  stylesStore
    .remove(styleId)
    .then((style) => {
      res.status(200).send(style);
    })
    .catch(next);
});

export default styleApiRouter;
