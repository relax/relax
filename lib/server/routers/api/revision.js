import {Router} from 'express';
import revisionsStore from '../../stores/revisions';
import {Types} from 'mongoose';

var revisionApiRouter = new Router();

revisionApiRouter.use('/api/revision*', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send();
  }
});

revisionApiRouter.get('/api/revision', (req, res, next) => {
  let options = req.query;
  if (options.id) {
    options.query = options.query || {};
    options.query['_id._id'] = options.id;
    delete options.id;
  }

  revisionsStore
    .findAll(options)
    .then((revisions) => {
      res.status(200).send(revisions);
    })
    .catch(next);
});

revisionApiRouter.get('/api/revision/:id', (req, res, next) => {
  var docId = req.params.id;

  const _id = new Types.ObjectId(docId.slice(0, 24));
  const __v = parseInt(docId.slice(24), 10);

  revisionsStore
    .findById({_id, __v})
    .then((revision) => {
      res.status(200).send(revision);
    })
    .catch(next);
});

revisionApiRouter.post('/api/revision',  (req, res, next) => {
  revisionsStore
    .add(req.body)
    .then((revision) => {
      res.status(200).send(revision);
    })
    .catch(next);
});

revisionApiRouter.put('/api/revision/:id',  (req, res, next) => {
  var revisionId = req.params.id;

  revisionsStore
    .update(revisionId, req.body)
    .then((revision) => {
      res.status(200).send(revision);
    })
    .catch(next);
});

revisionApiRouter.delete('/api/revision/:id',  (req, res, next) => {
  var revisionId = req.params.id;

  revisionsStore
    .remove(revisionId)
    .then((revision) => {
      res.status(200).send(revision);
    })
    .catch(next);
});

export default revisionApiRouter;
