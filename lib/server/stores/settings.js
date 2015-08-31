import {ServerStore} from 'relax-framework';
import SettingModel from '../models/setting';
import forEach from 'lodash.foreach';

class SettingsStore extends ServerStore {
  constructor () {
    super();
    this.Model = SettingModel;
  }
  parseSettings (_settings) {
    var settings = {};

    forEach(_settings, (setting) => {
      settings[setting._id] = setting.value;
    });

    return settings;
  }

}

export default new SettingsStore();
