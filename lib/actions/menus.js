import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  removeMenu: 'REMOVE_MENU',
  duplicateMenu: 'DUPLICATE_MENU'
};

export function removeMenu (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeMenu,
      query: `
        mutation removeMenu ($data: MenuInput!) {
          removeMenu (data: $data) {
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
