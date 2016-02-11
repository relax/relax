import {fragmentToQL} from 'relax-fragments';

import actionTypes from 'actions';
import request from 'helpers/request';

export function getRevisions (fragments, id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getRevisions,
      query: `
        query revisions ($id: String!) {
          revisions (id: $id) {
            ${fragmentToQL(fragments.revisions)}
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}
