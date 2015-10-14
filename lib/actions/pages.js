import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  removePage: 'REMOVE_PAGE'
};

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
