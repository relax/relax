import {Router} from 'express';
import pagesStore from '../../stores/pages';
import revisionsStore from '../../stores/revisions';
import {Types} from 'mongoose';
import forEach from 'lodash.foreach';

var pageApiRouter = new Router();

pageApiRouter.get('/api/page', (req, res, next) => {
  pagesStore
    .findAll(req.query)
    .then((responsePages) => {
      let pages = [];

      if (req.isAuthenticated()) {
        pages = responsePages;
      } else {
        forEach(responsePages, (page) => {
          if (page.state === 'published') {
            pages.push(page);
          }
        });
      }

      res.status(200).send(pages);
    })
    .catch(next);
});

pageApiRouter.get('/api/page/count', (req, res, next) => {
  if (req.isAuthenticated()) {
    pagesStore
      .count({})
      .then((count) => {
        res.status(200).send({count});
      })
      .catch(next);
  } else {
    next();
  }
});

pageApiRouter.get('/api/page/restore/:id/:version', (req, res, next) => {
  if (req.isAuthenticated()) {
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
  } else {
    res.status(401).send();
  }
});

pageApiRouter.get('/api/page/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    var pageId = req.params.id;

    pagesStore
      .findById(pageId)
      .then((page) => {
        res.status(200).send(page);
      })
      .catch(next);
  } else {
    next();
  }
});

pageApiRouter.get('/api/page/slug/:slug', (req, res, next) => {
  if (req.isAuthenticated()) {
    var slug = req.params.slug;

    pagesStore
      .count({slug: slug})
      .then((count) => {
        res.status(200).send({count});
      })
      .catch(next);
  } else {
    next();
  }
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
