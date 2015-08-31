import {Router} from 'express';
import usersStore from '../../stores/users';

var userApiRouter = new Router();

userApiRouter.get('/api/user', (req, res, next) => {
  usersStore
    .findAll(req.query)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

userApiRouter.get('/api/user/:id', (req, res, next) => {
  var userId = req.params.id;

  usersStore
    .findById(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

userApiRouter.post('/api/user',  (req, res, next) => {
  usersStore
    .add(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

userApiRouter.put('/api/user/:id',  (req, res, next) => {
  var userId = req.params.id;

  usersStore
    .update(userId, req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

userApiRouter.delete('/api/user/:id',  (req, res, next) => {
  var userId = req.params.id;

  usersStore
    .remove(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

export default userApiRouter;
