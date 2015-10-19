import actionTypes from './types';
import request from '../helpers/request';

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
