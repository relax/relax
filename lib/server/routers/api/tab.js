import {Router} from 'express';
import tabsStore from '../../stores/tabs';

var tabApiRouter = new Router();

tabApiRouter.get('/api/tab/:userId', (req, res, next) => {
  tabsStore
    .findAll({
      query: {
        userId: req.params.userId
      },
      populate: {
        path: 'pageId',
        select: 'title slug'
      }
    })
    .then((tabs) => {
      res.status(200).send(tabs);
    })
    .catch(next);
});

tabApiRouter.post('/api/tab/:userId',  (req, res, next) => {
  tabsStore
    .add(req.body)
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

tabApiRouter.put('/api/tab/:id',  (req, res, next) => {
  var tabId = req.params.id;

  tabsStore
    .update(tabId, req.body)
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

tabApiRouter.delete('/api/tab/:id',  (req, res, next) => {
  var tabId = req.params.id;

  tabsStore
    .remove(tabId)
    .then((tab) => {
      res.status(200).send(tab);
    })
    .catch(next);
});

export default tabApiRouter;
