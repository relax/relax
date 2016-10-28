export default (state, context) => {
  const editingSymbol = state.symbolsEditing.length > 0;
  const currentSymbolEditing = editingSymbol && state.symbolsEditing[state.symbolsEditing.length - 1];
  const isTemplate = !!(state.template && context === state.template._id);

  let result;

  if (isTemplate) {
    state.template[context] = state.template.data; // validate context with id -> data
    result = {
      doc: state.template,
      isTemplate
    };
  } else {
    // data fragment is the context of the item (page || entry || symbol)
    const dataFragment = currentSymbolEditing ? state.symbolsData[currentSymbolEditing.symbolId] : state;
    result = {
      dataFragment,
      doc: dataFragment.doc,
      currentSymbolEditing
    };
  }

  return result;
};
