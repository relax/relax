import {Router} from 'express';
import tabsStore from '../../stores/tabs';
import {Types} from 'mongoose';

var tabApiRouter = new Router();

tabApiRouter.get('/api/tab/:userId', (req, res, next) => {
  tabsStore
    .findAll({
      query: {
        '_id._userId': req.params.userId
      }
    })
    .then((tabs) => {
      res.status(200).send(tabs);
    })
    .catch(next);
});

tabApiRouter.post('/api/tab/:id/:userId',  (req, res, next) => {
  tabsStore
    .add(req.body)
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

tabApiRouter.put('/api/tab/:id/:userId',  (req, res, next) => {
  const _id = new Types.ObjectId(req.params.id);
  const _userId = new Types.ObjectId(req.params.userId);

  req.body.id && delete req.body.id;
  req.body.id && delete req.body.id;

  tabsStore
    .update({_id, _userId}, req.body)
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

tabApiRouter.delete('/api/tab/:id/:userId',  (req, res, next) => {
  const _id = new Types.ObjectId(req.params.id);
  const _userId = new Types.ObjectId(req.params.userId);

  tabsStore
    .remove({_id, _userId})
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

export default tabApiRouter;
