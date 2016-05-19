import actionTypes from 'actions';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';

export function openNewTemplate () {
  return {
    type: actionTypes.openNewTemplate
  };
}

export function closeNewTemplate () {
  return {
    type: actionTypes.closeNewTemplate
  };
}

export function changeTemplateTitle (value) {
  return {
    type: actionTypes.changeTemplateTitle,
    value
  };
}

export function addTemplate (redirect = true) {
  return (dispatch, getState) => {
    const title = getState().template.title;

    dispatch({
      type: actionTypes.templateLoading
    });

    return mutation(
      {
        fragments: {
          addTemplate: {
            _id: 1,
            title: 1,
            date: 1
          }
        },
        variables: {
          addTemplate: {
            title: {
              value: title,
              type: 'String!'
            }
          }
        }
      },
      (result) => {
        // TODO error handling
        dispatch({
          type: actionTypes.templateSuccess
        });

        if (redirect) {
          dispatch(pushState(null, `/admin/templates/${result.addTemplate._id}`));
        }
      }
    )(dispatch, getState);
  };
}

export function updateTemplateTitle (id, title) {
  return mutation({
    fragments: {
      updateTemplateTitle: {
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
      updateTemplateTitle: {
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

export function removeTemplate (id, redirect = true) {
  return mutation({
    fragments: {
      removeTemplate: {
        _id: 1
      }
    },
    variables: {
      removeTemplate: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, '/admin/templates'));
    }
  });
}
