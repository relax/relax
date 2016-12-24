import actionTypes from 'actions';

const defaultState = {
  loading: false
};

export default function symbolsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.savingSymbol:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.savedSymbol:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
