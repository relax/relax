import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';

export const actionTypes = {
  getPage: 'GET_PAGE',
  getPages: 'GET_PAGES',
  updatePage: 'UPDATE_PAGE'
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

export function getPages (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getPages,
      query: `
        query pages {
          pages {
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
