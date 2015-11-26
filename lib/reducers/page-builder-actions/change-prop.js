export default (data, action) => {
  const element = data[action.elementId];
  let previousValue;
  let changedElement;

  if (action.property === 'children') {
    previousValue = element.children || '';
    changedElement = Object.assign({}, element, {
      children: action.value,
      props: Object.assign({}, element.props || {}, {
        [action.property]: action.value
      })
    });
  } else {
    previousValue = element.props && element.props[action.property];
    changedElement = Object.assign({}, element, {
      props: Object.assign({}, element.props || {}, {
        [action.property]: action.value
      })
    });
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
