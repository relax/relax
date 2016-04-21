import actionTypes from 'actions';
import request from 'helpers/request';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

export function updatePage (fragments, data) {
  return mutation({
    fragments: {
      updatePage: {
        _id: 1,
        title: 1,
        slug: 1,
        updatedDate: 1
      }
    },
    variables: {
      updatePage: {
        data: {
          value: data,
          type: 'PageInput!'
        }
      }
    }
  });
}

export function publishPage (_id) {
  return mutation({
    fragments: {
      updatePage: {
        _id: 1,
        state: 1
      }
    },
    variables: {
      updatePage: {
        data: {
          value: {_id, state: 'published'},
          type: 'PageInput!'
        }
      }
    }
  });
}

export function unpublishPage (_id) {
  return mutation({
    fragments: {
      updatePage: {
        _id: 1,
        state: 1
      }
    },
    variables: {
      updatePage: {
        data: {
          value: {_id, state: 'draft'},
          type: 'PageInput!'
        }
      }
    }
  });
}

export function updatePageTitle (_id, title) {
  return mutation({
    fragments: {
      updatePage: {
        _id: 1,
        title: 1
      }
    },
    variables: {
      updatePage: {
        data: {
          value: {_id, title},
          type: 'PageInput!'
        }
      }
    }
  });
}

export function updatePageSlug (_id, slug) {
  return mutation({
    fragments: {
      updatePage: {
        _id: 1,
        slug: 1
      }
    },
    variables: {
      updatePage: {
        data: {
          value: {_id, slug},
          type: 'PageInput!'
        }
      }
    }
  });
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
  return mutation({
    fragments: {
      addPage: {
        _id: 1,
        title: 1,
        state: 1,
        slug: 1,
        date: 1,
        updatedDate: 1
      }
    },
    variables: {
      addPage: {
        data: {
          value: data,
          type: 'PageInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, `/admin/pages/${result.addPage._id}`));
    }
  });
}

export function removePage (id, redirect = false) {
  return mutation({
    fragments: {
      removePage: {
        _id: 1
      }
    },
    variables: {
      removePage: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, '/admin/pages'));
    }
  });
}

export function duplicatePage (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.duplicatePage,
      query: `
        mutation duplicatePage ($data: String!) {
          duplicatePage (data: $data) {
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
