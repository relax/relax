import request from '../client/helpers/request';

export const actionTypes = {
  getAdmin: 'GET_ADMIN',
  updatePage: 'UPDATE_PAGE'
};

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
