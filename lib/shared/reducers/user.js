import actionTypes from 'actions';

const defaultState = {
  removeConfirm: false,
  removing: false,
  changingPassword: false,
  updatingPassword: false,
  password: '',
  passwordConfirm: ''
};

export default function userReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.toggleRemoveUser:
      return Object.assign({}, state, {
        removeConfirm: !state.removeConfirm
      });
    case actionTypes.removingUser:
      return Object.assign({}, state, {
        removing: true
      });
    case actionTypes.removedUser:
      return Object.assign({}, state, {
        removeConfirm: false,
        removing: false
      });
    case actionTypes.toggleUserChangingPassword:
      return Object.assign({}, state, {
        changingPassword: !state.changingPassword
      });
    case actionTypes.changeUserPasswordValue:
      return Object.assign({}, state, {
        [action.key]: action.value
      });
    case actionTypes.updatingUserPassword:
      return Object.assign({}, state, {
        updatingPassword: true
      });
    case actionTypes.updatedUserPassword:
      return Object.assign({}, state, {
        changingPassword: false,
        updatingPassword: false,
        password: '',
        passwordConfirm: ''
      });
    default:
      return state;
  }
}
