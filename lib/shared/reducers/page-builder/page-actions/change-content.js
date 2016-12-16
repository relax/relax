import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element children content (text)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - value
 *  - context
 *    - doc
 *    - property
 */
export default (doc, action) => {
  const {elementId, value, context} = action;

  // doc context data object
  const data = doc[context.property];

  // target element
  const element = data[elementId];
  const previousValue = element.children || '';

  // changes
  const changedElement = Object.assign({}, element, {
    children: value
  });

  return {
    doc: changeDocContext(doc, context.property, {
      [elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
