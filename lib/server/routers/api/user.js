import {Router} from 'express';
import usersStore from '../../stores/users';

var userApiRouter = new Router();

userApiRouter.get('/api/user', (req, res, next) => {
  if (req.isAuthenticated()) {
    usersStore
      .findAll(req.query)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(next);
  } else {
    res.status(401).send();
  }
});

userApiRouter.get('/api/user/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    var userId = req.params.id;

    usersStore
      .findById(userId)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(next);
  } else {
    res.status(401).send();
  }
});

userApiRouter.post('/api/user', (req, res, next) => {
  usersStore
    .add(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

userApiRouter.put('/api/user/:id', (req, res, next) => {
  var userId = req.params.id;

  usersStore
    .update(userId, req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

userApiRouter.delete('/api/user/:id', (req, res, next) => {
  var userId = req.params.id;

  usersStore
    .remove(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
});

export default userApiRouter;
