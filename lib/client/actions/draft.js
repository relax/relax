import actionTypes from './types';
import request from '../helpers/request';

export function saveDraft () {
  return (dispatch, getState) => {
    const draftData = getState().draft.data;
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
