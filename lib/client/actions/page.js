import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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

export function addPage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addPage,
      query: `
        mutation addPage ($data: PageInput!) {
          addPage (data: $data) {
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

export function validatePageSlug ({slug, pageId}) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.validatePageSlug,
      query: `
        query validatePageSlug ($slug: String!, $pageId: ID) {
          validatePageSlug (slug: $slug, pageId: $pageId)
        }
      `,
      variables: {
        slug,
        pageId
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

export function changePageToDefault () {
  return {
    type: actionTypes.changePageToDefault
  };
}
