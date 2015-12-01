import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
import stringifyFields from '../helpers/stringify-fields';

const stringifiableFields = ['options', 'displayOptions'];

export function saveStyle (fragments, elementId, data) {
  return (dispatch, getState) => (
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
        data: stringifyFields(data, stringifiableFields)
      },
      params: {
        elementId,
        display: getState().display
      }
    })
  );
}

export function changeStyleProp (styleId, property, value) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.changeStyleProp,
      styleId,
      property,
      value,
      display
    });
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
        data: stringifyFields(data, stringifiableFields)
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
