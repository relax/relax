import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeMenu (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeMenu,
      query: `
        mutation removeMenu ($data: MenuInput!) {
          removeMenu (data: $data) {
            ${fragmentToQL(fragments.menu)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function duplicateMenu (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.duplicateMenu,
      query: `
        mutation duplicateMenu ($data: String!) {
          duplicateMenu (data: $data) {
            ${fragmentToQL(fragments.menu)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
