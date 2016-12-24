import actionTypes from 'actions';

export const defaultState = true;

export default function adminMenuReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.openAdminMenu:
      return true;
    case actionTypes.closeAdminMenu:
      return false;
    default:
      return state;
  }
}
