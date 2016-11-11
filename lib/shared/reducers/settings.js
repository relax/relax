import actionTypes from 'actions';
import forEach from 'lodash/forEach';
import {actionTypes as relateActionTypes} from 'relate-js';

const defaultState = {
  saving: false,
  saved: false
};

function parseSettings (_settings) {
  const settings = {};

  forEach(_settings, (setting) => {
    settings[setting._id] = setting.value;
  });

  return settings;
}

function getSettings (action) {
  const result = {};

  forEach(action.data, (dataObj, key) => {
    if (key === 'settings' || action.scopes[key] === 'settings') {
      Object.assign(result, parseSettings(dataObj));
    }
  });

  return result;
}


export default function settingsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case relateActionTypes.query: {
      const data = getSettings(action);
      if (data) {
        return Object.assign({}, state,
          data,
          defaultState
        );
      }
      return state;
    }
    case actionTypes.changeSettingValue:
      return Object.assign({}, state, {
        [action.id]: action.value
      });
    case actionTypes.savingSettings:
      return Object.assign({}, state, {
        saving: true,
        saved: false
      });
    case actionTypes.savedSettings:
      return Object.assign({}, state, {
        saving: false,
        saved: true
      });
    case actionTypes.savedSettingsOut:
      return Object.assign({}, state, {
        saving: false,
        saved: false
      });
    default:
      return state;
  }
}
