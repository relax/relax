import {Router} from 'express';
import schemasStore from '../../stores/schemas';
import revisionsStore from '../../stores/revisions';
import {Types} from 'mongoose';

var schemaApiRouter = new Router();

schemaApiRouter.get('/api/schema', (req, res, next) => {
  schemasStore
    .findAll(req.query)
    .then((schemas) => {
      res.status(200).send(schemas);
    })
    .catch(next);
});

schemaApiRouter.get('/api/schema/restore/:id/:version', (req, res, next) => {
  const _id = new Types.ObjectId(req.params.id);
  const _version = parseInt(req.params.version, 10);

  revisionsStore
    .findById({_id, _version})
    .then((revision) => {
      return schemasStore.update(_id, revision.doc);
    })
    .then((schema) => {
      res.status(200).send(schema);
    })
    .catch(next);
});

schemaApiRouter.get('/api/schema/:id', (req, res, next) => {
  var schemaId = req.params.id;

  schemasStore
    .findById(schemaId)
    .then((schema) => {
      res.status(200).send(schema);
    })
    .catch(next);
});

schemaApiRouter.get('/api/schema/slug/:slug', (req, res, next) => {
  var slug = req.params.slug;

  schemasStore
    .count({slug: slug})
    .then((count) => {
      res.status(200).send({count});
    })
    .catch(next);
});

schemaApiRouter.post('/api/schema',  (req, res, next) => {
  schemasStore
    .add(req.body)
    .then((schema) => {
      res.status(200).send(schema);
    })
    .catch(next);
});

schemaApiRouter.put('/api/schema/:id',  (req, res, next) => {
  var schemaId = req.params.id;

  schemasStore
    .update(schemaId, req.body)
    .then((schema) => {
      res.status(200).send(schema);
    })
    .catch(next);
});

schemaApiRouter.delete('/api/schema/:id',  (req, res, next) => {
  var schemaId = req.params.id;

  schemasStore
    .remove(schemaId)
    .then((schema) => {
      res.status(200).send(schema);
    })
    .catch(next);
});

export default schemaApiRouter;
