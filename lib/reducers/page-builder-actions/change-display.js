
// Changes an element 'visible on' property
// action:
//   - elementId
//   - display

export default (data, action) => {
  const element = data[action.elementId];
  const previousValue = element.hide && element.hide[action.display] ? true : false;
  const changedElement = Object.assign({}, element, {
    hide: Object.assign({}, element.hide || {}, {
      [action.display]: !previousValue
    })
  });

  return {
    data: Object.assign({}, data, {
      [action.elementId]: changedElement
    }),
    revertAction: Object.assign({}, action)
  };
};
