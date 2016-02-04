import actionTypes from 'actions';

export function changeDisplay (value) {
  return {
    type: actionTypes.changeDisplay,
    value
  };
}
