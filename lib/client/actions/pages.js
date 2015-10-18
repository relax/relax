import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removePage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removePage,
      query: `
        mutation removePage ($data: PageInput!) {
          removePage (data: $data) {
            ${fragmentToQL(fragments.page)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function duplicatePage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.duplicatePage,
      query: `
        mutation duplicatePage ($data: String!) {
          duplicatePage (data: $data) {
            ${fragmentToQL(fragments.page)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
