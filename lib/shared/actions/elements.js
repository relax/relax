import actionTypes from 'actions';
import request from 'helpers/request';

export function getElementData (elementId, {query, variables}) {
  return (dispatch) => request({
    dispatch,
    type: actionTypes.getElementData,
    query,
    variables,
    params: {
      elementId
    }
  });
}
