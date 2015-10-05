import {Router} from 'express';
import draftsStore from '../../stores/drafts';
import {Types} from 'mongoose';

var draftApiRouter = new Router();

draftApiRouter.use('/api/draft*', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send();
  }
});

draftApiRouter.get('/api/draft', (req, res, next) => {
  let options = req.query;
  if (options.id) {
    options.query = options.query || {};
    options.query['_id._pageId'] = options.id;
    delete options.id;
  }

  draftsStore
    .findAll(options)
    .then((drafts) => {
      res.status(200).send(drafts);
    })
    .catch(next);
});

draftApiRouter.get('/api/draft/:id/:userId', (req, res, next) => {
  const _pageId = new Types.ObjectId(req.params.id);
  const _userId = new Types.ObjectId(req.params.userId);

  draftsStore
    .findById({_pageId, _userId})
    .then((draft) => {
      res.status(200).send(draft);
    })
    .catch(() => {
      res.status(404).end();
    });
});

draftApiRouter.post('/api/draft/:id/:userId',  (req, res, next) => {
  draftsStore
    .add(req.body)
    .then((draft) => {
      res.status(200).send(draft);
    })
    .catch(next);
});

draftApiRouter.put('/api/draft/:id/:userId',  (req, res, next) => {
  const _pageId = new Types.ObjectId(req.params.id);
  const _userId = new Types.ObjectId(req.params.userId);

  req.body.id && delete req.body.id;
  req.body._id && delete req.body._id;

  draftsStore
    .update({_pageId, _userId}, req.body)
    .then((draft) => {
      res.status(200).send(draft);
    })
    .catch(next);
});

draftApiRouter.delete('/api/draft/:id/:userId',  (req, res, next) => {
  const _pageId = new Types.ObjectId(req.params.id);
  const _userId = new Types.ObjectId(req.params.userId);

  draftsStore
    .remove({_pageId, _userId})
    .then((draft) => {
      res.status(200).send(draft);
    })
    .catch(next);
});

export default draftApiRouter;
