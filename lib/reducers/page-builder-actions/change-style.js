export default (data, action) => {
  const element = data[action.elementId];
  const previousValue = element.style && element.style[action.property];
  const changedElement = Object.assign({}, element, {
    style: Object.assign({}, element.style || {}, {
      [action.property]: action.value
    })
  });

  if (action.value === null || typeof action.value === 'undefined') {
    delete changedElement.style[action.property];
  }

  return {
    data: Object.assign({}, data, {
      [action.elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
