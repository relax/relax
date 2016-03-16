import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

export function removeSchema (fragments, id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeSchema,
      query: `
        mutation removeSchema ($id: String!) {
          removeSchema (id: $id) {
            ${fragmentToQL(fragments.schema)}
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}
