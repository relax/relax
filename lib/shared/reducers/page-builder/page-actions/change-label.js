import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element label
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
  const previousValue = element.label || element.tag;

  return {
    doc: changeDocContext(doc, context, {
      [elementId]: Object.assign({}, element, {
        label: value
      })
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
