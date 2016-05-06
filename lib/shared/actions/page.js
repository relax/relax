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

export function updatePageTitle (id, title) {
  return mutation({
    fragments: {
      updatePageTitle: {
        _id: 1,
        title: 1,
        __v: 1,
        updatedDate: 1
      }
    },
    variables: {
      updatePageTitle: {
        id: {
          value: id,
          type: 'ID!'
        },
        title: {
          value: title,
          type: 'String!'
        }
      }
    }
  });
}

export function updatePageSlug (id, slug) {
  return mutation({
    fragments: {
      updatePageSlug: {
        _id: 1,
        slug: 1,
        __v: 1,
        updatedDate: 1
      }
    },
    variables: {
      updatePageSlug: {
        id: {
          value: id,
          type: 'ID!'
        },
        slug: {
          value: slug,
          type: 'String!'
        }
      }
    }
  });
}

export function savePageFromDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;

    return mutation({
      fragments: {
        updatePageFromDraft: {
          page: {
            _id: 1,
            __v: 1
          },
          draft: {
            _id: 1,
            __v: 1
          }
        }
      },
      variables: {
        updatePageFromDraft: {
          data: JSON.stringify(pageBuilder.data)
        }
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

export function validatePageSlug ({slug, id}) {
  return mutation({
    fragments: {
      validatePageSlug: 1
    },
    variables: {
      validatePageSlug: {
        id: {
          value: id,
          type: 'ID!'
        },
        slug: {
          value: slug,
          type: 'String!'
        }
      }
    }
  });
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
