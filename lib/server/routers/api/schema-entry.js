import {Router} from 'express';
import schemaEntriesStoreFactory from '../../stores/schema-entries';
import revisionsStore from '../../stores/revisions';
import {Types} from 'mongoose';
import Q from 'q';

var schemaEntryApiRouter = new Router();

schemaEntryApiRouter.get('/api/schema-entry/:slug', (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.findAll(req.query))
    .then((schemaEntries) => {
      res.status(200).send(schemaEntries);
    })
    .catch(next);
});

schemaEntryApiRouter.get('/api/schema-entry/:slug/count', (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.count({}))
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

schemaEntryApiRouter.get('/api/schema-entry/restore/:slug/:id/:version', (req, res, next) => {
  const slug = req.params.slug;
  const _id = new Types.ObjectId(req.params.id);
  const __v = parseInt(req.params.version, 10);

  Q
    .all([
      schemaEntriesStoreFactory(slug),
      revisionsStore.findById({_id, __v})
    ])
    .spread((store, revision) => {
      return store.update(_id, revision.doc);
    })
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch(next);
});

schemaEntryApiRouter.get('/api/schema-entry/:slug/:id', (req, res, next) => {
  var schemaEntryId = req.params.id;
  var slug = req.params.slug;

  schemaEntriesStoreFactory(slug)
    .then((schemaEntryStore) => schemaEntryStore.findById(schemaEntryId))
    .then((schemaEntry) => {
      res.status(200).send(schemaEntry);
    })
    .catch(next);
});

schemaEntryApiRouter.get('/api/schema-entry/:slug/slug/:entry', (req, res, next) => {
  var entry = req.params.entry;
  var slug = req.params.slug;

  schemaEntriesStoreFactory(slug)
    .then((schemaEntryStore) => schemaEntryStore.count({_slug: entry}))
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

schemaEntryApiRouter.post('/api/schema-entry/:slug',  (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.add(req.body))
    .then((schemaEntry) => {
      res.status(200).send(schemaEntry);
    })
    .catch(next);
});

schemaEntryApiRouter.put('/api/schema-entry/:slug/:id',  (req, res, next) => {
  var schemaEntryId = req.params.id;

  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.update(schemaEntryId, req.body))
    .then((schemaEntry) => {
      res.status(200).send(schemaEntry);
    })
    .catch(next);
});

schemaEntryApiRouter.delete('/api/schema-entry/:slug/:id',  (req, res, next) => {
  var schemaEntryId = req.params.id;

  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.remove(schemaEntryId))
    .then((schemaEntry) => {
      res.status(200).send(schemaEntry);
    })
    .catch(next);
});

export default schemaEntryApiRouter;
