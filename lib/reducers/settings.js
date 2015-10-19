import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {},
  errors: null
};

function parseSettings (_settings) {
  var settings = {};

  forEach(_settings, (setting) => {
    settings[setting._id] = setting.value;
  });

  return settings;
}

export default function settingsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.settings) {
        return Object.assign({}, state, {
          data: parseSettings(action.data.settings),
          errors: action.errors
        });
      }
      return state;
    case actionTypes.changeSettingValue:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {[action.id]: action.value}),
        errors: action.errors
      });
    case actionTypes.saveSettings:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data),
        errors: action.errors
      });
    default:
      return state;
  }
}
