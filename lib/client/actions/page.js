import {pushState} from 'redux-router';
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
  return (dispatch) => {
    return request({
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
    }).then((result) => {
      return result.updatePage;
    });
  };
}

export function savePageFromDraft (fragments, publish = false) {
  return (dispatch, getState) => {
    const draft = getState().draft.data;
    const page = getState().page.data;
    const stringified = JSON.stringify(draft.data);

    const pageInput = Object.assign({}, page, {
      data: stringified,
      state: publish ? 'published' : page.state
    });
    const draftInput = Object.assign({}, draft, {
      data: stringified,
      actions: '[]',
      __v: page.__v + 1
    });

    return request({
      dispatch,
      type: actionTypes.savePageFromDraft,
      query: `
        mutation ($data: PageInput!, $data0: DraftInput!) {
          updatePage (data: $data) {
            ${fragmentToQL(fragments.page)}
          }
          updateDraft (data: $data0) {
            ${fragmentToQL(fragments.draft)}
          }
        }
      `,
      variables: {
        data: pageInput,
        data0: draftInput
      }
    });
  };
}

export function addPage (fragments, data, redirect = false) {
  return (dispatch) => {
    return request({
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
    }).then((result) => {
      if (redirect) {
        dispatch(pushState(null, '/admin/page/' + result.addPage._id));
      }
      return result.addPage;
    });
  };
}

export function restorePage (fragments, pageId, version) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.restorePage,
      query: `
        mutation restorePage ($pageId: ID!, $version: Int!) {
          restorePage (pageId: $pageId, version: $version) {
            ${fragmentToQL(fragments.page)}
          }
        }
      `,
      variables: {
        pageId,
        version
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
