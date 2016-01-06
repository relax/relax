export default (data, action) => {
  const defaults = {
    position: 'static',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    zIndex: '1'
  };
  const element = data[action.elementId];
  const previousValue = element.position && element.position[action.property];
  const changedElement = Object.assign({}, element, {
    position: Object.assign({}, element.position || defaults, {
      [action.property]: action.value
    })
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
