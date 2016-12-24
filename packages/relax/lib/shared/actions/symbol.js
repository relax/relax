import actionTypes from 'actions';
import {mutation} from 'relate-js';

export function updateSymbol (symbolId, data, callback) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.savingSymbol
    });
    mutation({
      fragments: {
        updateSymbol: {
          _id: 1,
          data: 1
        }
      },
      variables: {
        updateSymbol: {
          id: {
            type: 'ID!',
            value: symbolId
          },
          data: {
            type: 'JSON!',
            value: data
          }
        }
      }
    }, () => {
      dispatch({
        type: actionTypes.savedSymbol
      });
      if (callback) {
        callback(dispatch);
      }
    })(dispatch, getState);
  };
}
