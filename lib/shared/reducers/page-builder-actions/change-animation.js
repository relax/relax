import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element animation property
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - property
 *  - value
 *  - context
 */
export default (doc, action) => {
  // default animation properties
  const defaults = {
    use: false,
    effect: 'transition.fadeIn',
    duration: 400,
    delay: 300
  };

  // doc context data object
  const data = doc[action.context];

  // target element
  const element = data[action.elementId];
  const previousValue = element.animation && element.animation[action.property];

  // changes
  const changedElement = Object.assign({}, element, {
    animation: Object.assign(defaults, element.animation, {
      [action.property]: action.value
    })
  });

  return {
    doc: changeDocContext(doc, action.context, {
      [action.elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
