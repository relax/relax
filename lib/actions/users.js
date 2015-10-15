import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  removeUser: 'REMOVE_USER',
  addUser: 'ADD_USER'
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

export function addUser (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addUser,
      query: `
        mutation addUser ($data: UserInput!) {
          addUser (data: $data) {
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
