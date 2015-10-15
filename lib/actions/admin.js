import actionTypes from './types';
import request from '../client/helpers/request';

export function getAdmin ({query, variables}) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.getAdmin,
      query,
      variables
    });
  };
}
