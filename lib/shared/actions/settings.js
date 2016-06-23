import actionTypes from 'actions';
import forEach from 'lodash.foreach';
import {mutation} from 'relate-js';

export function changeSettingValue (id, value) {
  return {
    type: actionTypes.changeSettingValue,
    id,
    value
  };
}

export function saveSettings (ids) {
  return (dispatch, getState) => {
    const settings = getState().settings;
    const settingsArr = [];

    forEach(ids, (id) => {
      if (settings[id]) {
        settingsArr.push({
          _id: id,
          value: settings[id]
        });
      }
    });

    if (settingsArr.length) {
      dispatch({
        type: actionTypes.savingSettings
      });
      mutation({
        fragments: {
          saveSettings: {
            _id: 1,
            value: 1
          }
        },
        variables: {
          saveSettings: {
            data: {
              type: '[SettingInput]!',
              value: settingsArr
            }
          }
        }
      }, () => {
        dispatch({
          type: actionTypes.savedSettings
        });
        setTimeout(() => {
          dispatch({
            type: actionTypes.savedSettingsOut
          });
        }, 2000);
      })(dispatch, getState);
    }
  };
}
