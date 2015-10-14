import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  updateMenu: 'UPDATE_MENU',
  addMenu: 'ADD_MENU',
  changeMenuFields: 'CHANGE_FIELDS',
  changeMenuToDefault: 'CHANGE_TO_DEFAULT'
};

export function updateMenu (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateMenu,
      query: `
        mutation updateMenu ($data: MenuInput!) {
          updateMenu (data: $data) {
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

export function addMenu (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addMenu,
      query: `
        mutation addMenu ($data: MenuInput!) {
          addMenu (data: $data) {
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

export function changeMenuFields (values) {
  return {
    type: actionTypes.changeMenuFields,
    values
  };
}

export function changeMenuToDefault () {
  return {
    type: actionTypes.changeMenuToDefault
  };
}
