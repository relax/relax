import {Router} from 'express';
import settingsStore from '../../stores/settings';

var settingApiRouter = new Router();

settingApiRouter.get('/api/setting', (req, res, next) => {
  settingsStore
    .findByIds(JSON.parse(req.query.ids))
    .then((settings) => {
      res.status(200).send(settings);
    })
    .catch(next);
});

settingApiRouter.get('/api/setting/:id', (req, res, next) => {
  var settingId = req.params.id;

  settingsStore
    .findById(settingId)
    .then((setting) => {
      res.status(200).send(setting);
    })
    .catch(next);
});

settingApiRouter.post('/api/setting',  (req, res, next) => {
  settingsStore
    .add(req.body)
    .then((setting) => {
      res.status(200).send(setting);
    })
    .catch(next);
});

settingApiRouter.put('/api/setting/:id',  (req, res, next) => {
  var settingId = req.params.id;

  settingsStore
    .update(settingId, req.body)
    .then((setting) => {
      res.status(200).send(setting);
    })
    .catch(next);
});

settingApiRouter.delete('/api/setting/:name',  (req, res, next) => {
  var settingName = req.params.name;

  settingsStore
    .remove(settingName)
    .then(() => {
      res.status(200).end();
    })
    .catch(next);
});

export default settingApiRouter;
