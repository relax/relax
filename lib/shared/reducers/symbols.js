import actionTypes from 'actions';
import forEach from 'lodash.foreach';

const defaultState = {};

export default function symbolsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.graphql:
      if (action.data.symbols) {
        const changes = {};

        forEach(action.data.symbols, (symbol) => {
          if (state[symbol._id]) {
            changes[symbol._id] = Object.assign({}, state[symbol._id], symbol);
          } else {
            changes[symbol._id] = symbol;
          }
        });

        return Object.assign({}, state, changes);
      }
      return state;
    case actionTypes.makeElementSymbol: {
      const {symbol} = action;
      const _id = symbol._id;
      const data = Object.assign({}, action.symbol, {
        data: action.symbol.data
      });
      return Object.assign({}, state, {
        [_id]: Object.assign({}, state[_id] || {}, data)
      });
    }
    case actionTypes.getSymbol: {
      return Object.assign({}, state, {
        [action.data.symbol._id]: Object.assign(
          {},
          state[action.data.symbol._id] || {},
          action.data.symbol
        )
      });
    }
    default:
      return state;
  }
}
