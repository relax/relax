import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
  return (dispatch) => {
    return request({
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
    }).then((result) => {
      return result.addMenu;
    });
  };
}

export function validateMenuSlug ({slug, menuId}) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.validateMenuSlug,
      query: `
        query validateMenuSlug ($slug: String!, $menuId: ID) {
          validateMenuSlug (slug: $slug, menuId: $menuId)
        }
      `,
      variables: {
        slug,
        menuId
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
