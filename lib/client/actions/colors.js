import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function updateColor (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateColor,
      query: `
        mutation updateColor ($data: ColorInput!) {
          updateColor (data: $data) {
            ${fragmentToQL(fragments.color)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function addColor (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addColor,
      query: `
        mutation addColor ($data: ColorInput!) {
          addColor (data: $data) {
            ${fragmentToQL(fragments.color)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function removeColor (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeColor,
      query: `
        mutation removeColor ($data: ColorInput!) {
          removeColor (data: $data) {
            ${fragmentToQL(fragments.color)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
