import actionTypes from 'actions';
import request from 'helpers/request';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';
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
  return mutation({
    fragments: {
      addMenu: {
        _id: 1,
        title: 1,
        date: 1
      }
    },
    variables: {
      addMenu: {
        data: {
          value: data,
          type: 'MenuInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, '/admin/menus/' + result.addMenu._id));
    }
  });
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
