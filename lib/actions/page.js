import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  getPage: 'GET_PAGE',
  updatePage: 'UPDATE_PAGE',
  changePageFields: 'CHANGE_FIELDS',
  changePageToDefault: 'CHANGE_TO_DEFAULT'
};

export function getPage (fragments, slug) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPage,
      query: `
          query page ($slug: String!) {
            page (slug: $slug) {
              ${fragmentToQL(fragments.page)}
            }
          }
      `,
      variables: {
        slug
      }
    })
  );
}

export function updatePage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updatePage,
      query: `
        mutation updatePage ($data: PageInput!) {
          updatePage (data: $data) {
            ${fragmentToQL(fragments.page)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function changePageFields (values) {
  return {
    type: actionTypes.changePageFields,
    values
  };
}

export function changePageToDefault (values) {
  return {
    type: actionTypes.changePageToDefault
  };
}
