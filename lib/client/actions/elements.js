import actionTypes from './types';
import request from '../helpers/request';

export function getElementData (elementId, {query, variables}) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.getElementData,
      query,
      variables,
      params: {
        elementId
      }
    });
  };
}
