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
  let previousValue;
  let changedElement;

  if (action.display === 'desktop') {
    previousValue = element.position && element.position[action.property];
    changedElement = Object.assign({}, element, {
      position: Object.assign({}, element.position || defaults, {
        [action.property]: action.value
      })
    });
  } else {
    previousValue =
      element.displayPosition &&
      element.displayPosition[action.display] &&
      element.displayPosition[action.display][action.property];
    changedElement = Object.assign({}, element, {
      displayPosition: Object.assign({}, element.displayPosition || {}, {
        [action.display]: Object.assign(
          {},
          element.displayPosition && element.displayPosition[action.display] || {},
          {
            [action.property]: action.value
          }
        )
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
