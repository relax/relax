import actionTypes from 'actions';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbEditSymbol: {
      const {elementId, symbol} = action;

      return Object.assign({}, state, {
        focused: {
          id: elementId,
          context
        },
        symbolsEditing: [...state.symbolsEditing, {
          id: elementId,
          context,
          symbolId: symbol._id
        }],
        symbolsData: Object.assign({}, state.symbolsData, {
          [symbol._id]: {
            doc: {
              [symbol._id]: symbol.data
            },
            actions: [],
            redos: []
          }
        })
      });
    }
    case actionTypes.pbCloseEditSymbol: {
      const symbolsEditing = state.symbolsEditing.slice(0);
      const removedId = symbolsEditing.pop();
      const nextFocused = symbolsEditing.length && symbolsEditing[symbolsEditing.length - 1];
      const symbolsData = Object.assign({}, state.symbolsData);
      delete symbolsData[removedId];

      return Object.assign({}, state, {
        focused: nextFocused,
        symbolsEditing,
        symbolsData,
        selected: null,
        selectedElement: null,
        selectedParent: null,
        selectedPath: [],
        overed: null
      });
    }
    default:
      return state;
  }
};
