
// Changes an element custom style property (no-style only)
// action:
//   - type
//   - elementId
//   - property
//   - value
//   - display

export default (data, action) => {
  const element = data[action.elementId];
  let previousValue;
  let changedElement;

  if (action.display === 'desktop') {
    previousValue = element.style && element.style[action.property];

    changedElement = Object.assign({}, element, {
      style: Object.assign({}, element.style || {}, {
        [action.property]: action.value
      })
    });

    if (action.value === null || typeof action.value === 'undefined') {
      delete changedElement.style[action.property];
    }
  } else {
    previousValue = element.displayStyle && element.displayStyle[action.display] && element.displayStyle[action.display][action.property];

    changedElement = Object.assign({}, element, {
      displayStyle: Object.assign({}, element.displayStyle || {}, {
        [action.display]: Object.assign({}, element.displayStyle && element.displayStyle[action.display] || {}, {
          [action.property]: action.value
        })
      })
    });

    if (action.value === null || typeof action.value === 'undefined') {
      delete changedElement.displayStyle[action.display][action.property];
    }
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
