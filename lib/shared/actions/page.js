import actionTypes from 'actions';
import {push} from 'redux-router';
import {mutation} from 'relate-js';

export function publishPage (id) {
  return mutation({
    fragments: {
      updatePageState: {
        _id: 1,
        state: 1
      }
    },
    variables: {
      updatePageState: {
        id: {
          value: id,
          type: 'ID!'
        },
        state: {
          value: 'published',
          type: 'String!'
        }
      }
    }
  });
}

export function unpublishPage (id) {
  return mutation({
    fragments: {
      updatePageState: {
        _id: 1,
        state: 1
      }
    },
    variables: {
      updatePageState: {
        id: {
          value: id,
          type: 'ID!'
        },
        state: {
          value: 'draft',
          type: 'String!'
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
        updatedDate: 1,
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        }
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
        updatedDate: 1,
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        }
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

export function addPage (data, redirect = false, redirectBuild = false) {
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
      dispatch(push({
        pathname: `/admin/pages/${result.addPage._id}`,
        query: redirectBuild && {build: 1} || {}
      }));
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
      dispatch(push('/admin/pages'));
    }
  });
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
