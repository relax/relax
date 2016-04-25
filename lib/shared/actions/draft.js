import actionTypes from 'actions';
import request from 'helpers/request';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

export function saveDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;
    const draftInput = Object.assign({}, {
      data: JSON.stringify(pageBuilder.data),
      actions: JSON.stringify(pageBuilder.actions)
    });

    return mutation({
      fragments: {
        updateDraft: {
          _id: {
            _id: 1,
            _userId: 1
          }
        }
      },
      variables: {
        updateDraft: {
          id: {
            type: 'ID!',
            value: getState().router.params.id
          },
          data: {
            type: 'DraftInput!',
            value: draftInput
          }
        }
      }
    })(dispatch, getState);
  };
}

export function dropDraft (fragments, id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.dropDraft,
      query: `
        mutation dropDraft ($id: String!) {
          dropDraft (id: $id) {
            ${fragmentToQL(fragments.draft)}
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}
