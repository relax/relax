import actionTypes from './types';

export function changeDisplay (value) {
  return {
    type: actionTypes.changeDisplay,
    value
  };
}
