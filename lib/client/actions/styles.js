import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function saveStyle (fragments, elementId, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.saveStyle,
      query: `
        mutation addStyle ($data: StyleInput!) {
          addStyle (data: $data) {
            ${fragmentToQL(fragments.style)}
          }
        }
      `,
      variables: {
        data
      },
      params: {
        elementId
      }
    })
  );
}

export function changeStyleProp (styleId, property, value) {
  return {
    type: actionTypes.changeStyleProp,
    styleId,
    property,
    value
  };
}

export function updateStyle (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateStyle,
      query: `
        mutation updateStyle ($data: StyleInput!) {
          updateStyle (data: $data) {
            ${fragmentToQL(fragments.style)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function removeStyle (styleId) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeStyle,
      query: `
        mutation removeStyle ($id: ID!) {
          removeStyle (_id: $id) {
            _id
          }
        }
      `,
      variables: {
        id: styleId
      }
    })
  );
}
