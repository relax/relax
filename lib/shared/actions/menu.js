import actionTypes from 'actions';
import request from 'helpers/request';
import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-fragments';

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

export function addMenu (data, redirect = false) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.graphql,
      query: `
        mutation addMenu ($data: MenuInput!) {
          addMenu (data: $data) {
            _id,
            title,
            date
          }
        }
      `,
      variables: {
        data
      }
    }).then((result) => {
      if (redirect) {
        dispatch(pushState(null, '/admin/menus/' + result.addMenu._id));
      }
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
