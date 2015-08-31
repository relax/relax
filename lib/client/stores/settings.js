import every from 'lodash.every';
import forEach from 'lodash.foreach';
import {ClientStore} from 'relax-framework';
import SettingsCollection from '../collections/settings';
import settingActions from '../actions/settings';
import Q from 'q';

class SettingsStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(settingActions, 'saveSettings', this.saveSettings);
    }
  }

  createCollection () {
    return new SettingsCollection([], {
      ids: []
    });
  }

  saveSettings(settings) {
    var collection = this.getCollection();

    var promises = [], optionsIds = false;

    if (collection.options.ids) {
      optionsIds = collection.options.ids;
      delete collection.options.ids;
    }

    forEach(settings, (value, key) => {
      promises.push(collection.createOrUpdate({_id: key, value}));
    });

    return Q()
      .all(promises)
      .then(() => {
        var json = this.collection.toJSON();
        this.trigger('update', json);
        return json;
      })
      .catch((error) => {
        this.trigger('error', error);
      })
      .fin(() => {
        if (optionsIds) {
          collection.options.ids = optionsIds;
        }
      });
  }

  findByIds (settingsIds) {
    return Q()
      .then(() => this.getCollectionAsync({ids: settingsIds}))
      .then((collection) => {
        var result;

        if (!every(settingsIds, (settingId) => collection.get(settingId))) {
          collection.options.ids = settingsIds;
          result = Q()
            .then(() => this.fetchCollection())
            .then(() => {
              return collection.toJSON();
            });
        } else {
          result = Q().then(() => collection.toJSON());
        }

        return result;
      });
  }
}

export default new SettingsStore();
