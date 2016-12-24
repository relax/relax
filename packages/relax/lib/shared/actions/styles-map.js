import actionTypes from 'actions';

export function updateStylesMap (map) {
  return {
    type: actionTypes.updateStylesMap,
    map
  };
}
