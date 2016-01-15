import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const parsableFields = ['data'];
const defaultState = {};

export default function symbolsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.makeElementSymbol:
      const _id = action.data.addSymbol._id;
      const data = Object.assign({}, action.data.addSymbol, {
        data: JSON.parse(action.data.addSymbol.data)
      });
      return Object.assign({}, state, {
        [_id]: Object.assign({}, state[_id] || {}, data)
      });
    case actionTypes.getSymbol:
      return Object.assign({}, state, {
        [action.data.symbol._id]: Object.assign({}, state[action.data.symbol._id] || {}, parseFields(action.data.symbol, parsableFields))
      });
    default:
      return state;
  }
}
