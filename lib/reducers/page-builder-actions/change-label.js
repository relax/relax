export default (data, action) => {
  const element = data[action.elementId];
  const previousValue = element.label || element.tag;

  return {
    data: Object.assign({}, data, {
      [action.elementId]: Object.assign({}, element, {
        label: action.value
      })
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
