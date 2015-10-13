export const actionTypes = {
  changeDisplay: 'CHANGE_DISPLAY'
};

export function changeDisplay (value) {
  return {
    type: actionTypes.changeDisplay,
    value
  };
}
