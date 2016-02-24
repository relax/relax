import actionTypes from 'actions';
import request from 'helpers/request';

export function graphql ({query, variables}) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.graphql,
      query,
      variables
    });
  };
}
