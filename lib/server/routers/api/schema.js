import {Router} from 'express';
import schemasStore from '../../stores/schemas';

var schemaApiRouter = new Router();

schemaApiRouter.get('/api/schema', (req, res, next) => {
  schemasStore
    .findAll(req.query)
    .then((schemas) => {
      res.status(200).send(schemas);
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
