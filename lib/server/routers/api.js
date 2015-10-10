import {Router} from 'express';
import {graphql} from 'graphql';
import schema from '../schema';

const apiRouter = new Router();

apiRouter.get('/api', (req, res, next) => {
  const query = req.query.q;
  const params = JSON.parse(req.query.p);
  return graphql(schema.getSchema(), query, null, params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

apiRouter.post('/api', (req, res, next) => {
  const query = req.body.q;
  const params = req.body.p;
  return graphql(schema.getSchema(), query, null, params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

export default apiRouter;
