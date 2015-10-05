import {Router} from 'express';
import menusStore from '../../stores/menus';

var menuApiRouter = new Router();

menuApiRouter.get('/api/menu', (req, res, next) => {
  menusStore
    .findAll(req.query)
    .then((menus) => {
      res.status(200).send(menus);
    })
    .catch(next);
});

menuApiRouter.get('/api/menu/count', (req, res, next) => {
  menusStore
    .count({})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

menuApiRouter.get('/api/menu/:id', (req, res, next) => {
  menusStore
    .findById(req.params.id)
    .then((menu) => {
      res.status(200).send(menu);
    })
    .catch(next);
});

menuApiRouter.get('/api/menu/slug/:slug', (req, res, next) => {
  menusStore
    .count({slug: req.params.slug})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

menuApiRouter.post('/api/menu',  (req, res, next) => {
  menusStore
    .add(req.body)
    .then((menu) => {
      res.status(200).send(menu);
    })
    .catch(next);
});

menuApiRouter.put('/api/menu/:id',  (req, res, next) => {
  menusStore
    .update(req.params.id, req.body)
    .then((menu) => {
      res.status(200).send(menu);
    })
    .catch(next);
});

menuApiRouter.delete('/api/menu/:id',  (req, res, next) => {
  menusStore
    .remove(req.params.id)
    .then((menu) => {
      res.status(200).send(menu);
    })
    .catch(next);
});

export default menuApiRouter;
