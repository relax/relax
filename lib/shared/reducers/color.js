import actionTypes from 'actions';

const defaultState = {
  opened: false,
  loading: false,
  label: '',
  value: '#000000'
};

export default function colorReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.openNewColor:
      return Object.assign({}, state, {
        opened: true
      });
    case actionTypes.closeNewColor:
      return Object.assign({}, state, {
        opened: false
      });
    case actionTypes.changeColorProperty:
      return Object.assign({}, state, {
        [action.property]: action.value
      });
    case actionTypes.colorLoading:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.colorSuccess:
      return Object.assign({}, defaultState);
    default:
      return state;
  }
}
