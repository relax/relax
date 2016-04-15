import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

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
