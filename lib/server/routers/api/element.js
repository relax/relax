import {Router} from 'express';
import elementsStore from '../../stores/elements';

var elementApiRouter = new Router();

elementApiRouter.get('/api/element', (req, res, next) => {
  elementsStore
    .findAll()
    .then((elements) => {
      res.status(200).send(elements);
    })
    .catch(next);
});

export default elementApiRouter;
