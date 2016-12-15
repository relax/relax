import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element style (style ID)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - value
 *  - context
 */
export default (doc, action) => {
  const {elementId, value, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const previousValue = element.style;
  const changedElement = Object.assign({}, element, {
    style: value
  });

  // clean up own style props
  changedElement.styleProps && delete changedElement.styleProps;
  changedElement.displayStyleProps && delete changedElement.displayStyleProps;

  return {
    doc: changeDocContext(doc, context, {
      [elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
