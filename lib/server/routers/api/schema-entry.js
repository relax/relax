import {Router} from 'express';
import schemaEntriesStoreFactory from '../../stores/schema-entries';

var schemaEntryApiRouter = new Router();

schemaEntryApiRouter.get('/api/schema-entry/:slug', (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntryStore) => schemaEntryStore.findAll(req.query))
    .then((schemaEntries) => {
      res.status(200).send(schemaEntries);
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
