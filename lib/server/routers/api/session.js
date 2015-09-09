import {Router} from 'express';

var sessionApiRouter = new Router();

sessionApiRouter.get('/api/session', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    res.status(400).end();
  }
});

export default sessionApiRouter;
