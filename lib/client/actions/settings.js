import {fragmentToQL} from 'relax-framework';
import forEach from 'lodash.foreach';

import actionTypes from './types';
import request from '../helpers/request';

export function changeSettingValue (id, value) {
  return {
    type: actionTypes.changeSettingValue,
    id,
    value
  };
}

export function saveSettings (fragments, data) {
  const settings = [];
  forEach(data, (value, _id) => {
    settings.push({_id, value});
  });

  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.saveSettings,
      query: `
        mutation saveSettings ($data: [SettingInput]!) {
          saveSettings (data: $data) {
            ${fragmentToQL(fragments.settings)}
          }
        }
      `,
      variables: {
        data: settings
      }
    })
  );
}
