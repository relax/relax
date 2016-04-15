import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

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
            ${fragmentToQL(fragments.users)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
