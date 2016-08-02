import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element 'visible on' property
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - display
 *  - context
 */
export default (doc, action) => {
  const {elementId, display, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const previousValue = element.hide && element.hide[display] && true;

  // changes
  const changedElement = Object.assign({}, element, {
    hide: Object.assign({}, element.hide || {}, {
      [display]: !previousValue
    })
  });

  return {
    doc: changeDocContext(doc, context, {
      [elementId]: changedElement
    }),
    revertAction: Object.assign({}, action)
  };
};
