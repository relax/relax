import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  removeUser: 'REMOVE_USER'
};

export function removeUser (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeUser,
      query: `
        mutation removeUser ($data: String!) {
          removeUser (data: $data) {
            ${fragmentToQL(fragments.user)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
