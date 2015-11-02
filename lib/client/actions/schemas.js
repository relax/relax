import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
