import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function saveDraft (data = false) {
  return (dispatch, getState) => {
    const draftData = data || getState().draft.data;
    const draftInput = Object.assign({}, draftData, {
      data: JSON.stringify(draftData.data),
      actions: JSON.stringify(draftData.actions)
    });
    return request({
      dispatch,
      type: actionTypes.saveDraft,
      query: `
        mutation updateDraft ($data: DraftInput!) {
          updateDraft (data: $data) {
            _id {
              _id,
              _userId
            }
          }
        }
      `,
      variables: {
        data: draftInput
      }
    });
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
