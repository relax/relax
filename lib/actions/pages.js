import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  getPages: 'GET_PAGES'
};

export function getPages (fragments, variables) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPages,
      query: `
        query ($sort: String, $limit: String, $order: Int, page: Int) {
          pages () {
            ${fragmentToQL(fragments.page)}
          }
          pagesCount {count}
        }
      `,
      variables
    })
  );
}
