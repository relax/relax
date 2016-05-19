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

export function restoreTemplate (revisionId) {
  return mutation({
    fragments: {
      restoreTemplate: {
        template: {
          _id: 1,
          __v: 1,
          title: 1,
          updatedDate: 1,
          updatedBy: {
            _id: 1,
            email: 1,
            name: 1
          }
        },
        draft: {
          _id: 1,
          __v: 1,
          actions: 1,
          data: 1
        },
        revision: {
          _id: 1,
          version: 1,
          date: 1,
          user: {
            _id: 1,
            email: 1,
            name: 1
          }
        }
      }
    },
    variables: {
      restoreTemplate: {
        id: {
          value: revisionId,
          type: 'ID!'
        }
      }
    }
  });
}
