import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  getPage: 'GET_ADMIN'
};

export function getAdmin (fragments, slug) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPage,
      query: `
          query page ($slug: String!) {
            page (slug: $slug) {
              ${fragmentToQL(fragments.page)}
            }
          }
      `,
      variables: {
        slug
      }
    })
  );
}
