import actionTypes from './types';
import request from '../helpers/request';

export function saveDraft () {
  return (dispatch, getState) => (
    request({
      dispatch,
      type: actionTypes.saveDraft,
      query: `
        mutation updateDraft ($data: DraftInput!) {
          updateDraft (data: $data) {
            _id
          }
        }
      `,
      variables: {
        data: getState().draft.data
      }
    })
  );
}
