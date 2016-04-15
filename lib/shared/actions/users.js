import actionTypes from 'actions';
import request from 'helpers/request';
import {mutation} from 'relate-js';
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
  return mutation({
    fragments: {
      addUser: fragments.users
    },
    variables: {
      addUser: {
        data: {
          value: data,
          type: 'UserInput!'
        }
      }
    }
  });
}
