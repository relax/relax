import {Router} from 'express';
import pagesStore from '../../stores/pages';
import revisionsStore from '../../stores/revisions';
import {Types} from 'mongoose';

var pageApiRouter = new Router();

pageApiRouter.get('/api/page', (req, res, next) => {
  pagesStore
    .findAll(req.query)
    .then((pages) => {
      res.status(200).send(pages);
    })
    .catch(next);
});

pageApiRouter.get('/api/page/count', (req, res, next) => {
  pagesStore
    .count({})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

pageApiRouter.get('/api/page/restore/:id/:version', (req, res, next) => {
  const _id = new Types.ObjectId(req.params.id);
  const __v = parseInt(req.params.version, 10);

  revisionsStore
    .findById({_id, __v})
    .then((revision) => {
      return pagesStore.update(_id, revision.doc);
    })
    .then((page) => {
      res.status(200).send(page);
    })
    .catch(next);
});

pageApiRouter.get('/api/page/:id', (req, res, next) => {
  var pageId = req.params.id;

  pagesStore
    .findById(pageId)
    .then((page) => {
      res.status(200).send(page);
    })
    .catch(next);
});

pageApiRouter.get('/api/page/slug/:slug', (req, res, next) => {
  var slug = req.params.slug;

  pagesStore
    .count({slug: slug})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

pageApiRouter.post('/api/page',  (req, res, next) => {
  pagesStore
    .add(req.body)
    .then((page) => {
      res.status(200).send(page);
    })
    .catch(next);
});

pageApiRouter.put('/api/page/:id',  (req, res, next) => {
  const pageId = req.params.id;

  pagesStore
    .update(pageId, req.body)
    .then((page) => {
      res.status(200).send(page);
    })
    .catch(next);
});

pageApiRouter.delete('/api/page/:id',  (req, res, next) => {
  var pageId = req.params.id;

  pagesStore
    .remove(pageId)
    .then((page) => {
      res.status(200).send(page);
    })
    .catch(next);
});

export default pageApiRouter;
