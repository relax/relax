export default (data, action) => {
  const defaults = {
    use: false,
    effect: 'transition.fadeIn',
    duration: 400,
    delay: 300
  };
  const element = data[action.elementId];
  const previousValue = element.animation && element.animation[action.property];
  const changedElement = Object.assign({}, element, {
    animation: Object.assign({}, element.animation || defaults, {
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
