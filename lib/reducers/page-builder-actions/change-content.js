export default (data, action) => {
  const element = data[action.elementId];
  const previousValue = element.children || '';
  const changedElement = Object.assign({}, element, {
    children: action.value
  });

  return {
    data: Object.assign({}, data, {
      [action.elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
