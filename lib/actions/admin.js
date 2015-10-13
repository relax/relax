import {fragmentToQL} from 'relax-framework';

import request from '../client/helpers/request';

export const actionTypes = {
  getAdmin: 'GET_ADMIN',
  updatePage: 'UPDATE_PAGE'
};

export function getAdmin ({query, variables}) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.getAdmin,
      query,
      variables
    });
  };
}

// TODO Support mutations on `relax-framework`
export function updatePage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updatePage,
      query: `
        mutation updatePage ($data: PageInput!) {
          updatePage (data: $data) {
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
