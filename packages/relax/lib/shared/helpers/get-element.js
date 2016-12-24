export default ({state, id, context}) => {
  const editingSymbol = state.symbolsEditing.length > 0;
  const currentSymbolEditing = editingSymbol && state.symbolsEditing[state.symbolsEditing.length - 1];
  const dataFragment = currentSymbolEditing ? state.symbolsData[currentSymbolEditing.symbolId] : state;

  return dataFragment.doc[context] && dataFragment.doc[context][id];
};
