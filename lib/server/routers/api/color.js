import {Router} from 'express';
import colorsStore from '../../stores/colors';

var colorApiRouter = new Router();

colorApiRouter.get('/api/color', (req, res, next) => {
  colorsStore
    .findAll()
    .then((colors) => {
      res.status(200).send(colors);
    })
    .catch(next);
});

colorApiRouter.get('/api/color/:id', (req, res, next) => {
  var colorId = req.params.id;

  colorsStore
    .findById(colorId)
    .then((color) => {
      res.status(200).send(color);
    })
    .catch(next);
});

colorApiRouter.get('/api/color/slug/:slug', (req, res, next) => {
  var slug = req.params.slug;

  colorsStore
    .count({slug: slug})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

colorApiRouter.post('/api/color',  (req, res, next) => {
  colorsStore
    .add(req.body)
    .then((color) => {
      res.status(200).send(color);
    })
    .catch(next);
});

colorApiRouter.put('/api/color/:id',  (req, res, next) => {
  var colorId = req.params.id;

  colorsStore
    .update(colorId, req.body)
    .then((color) => {
      res.status(200).send(color);
    })
    .catch(next);
});

colorApiRouter.delete('/api/color/:id',  (req, res, next) => {
  var colorId = req.params.id;

  colorsStore
    .remove(colorId)
    .then((color) => {
      res.status(200).send(color);
    })
    .catch(next);
});

export default colorApiRouter;
