import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element style property (no-style only)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - display
 *  - property
 *  - value
 *  - context
 */
export default (doc, action) => {
  const {elementId, display, property, value, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  let previousValue;
  let changedElement;

  // changes
  if (display === 'desktop') {
    previousValue = element.style && element.style[property];
    changedElement = Object.assign({}, element, {
      style: Object.assign({}, element.style, {
        [property]: value
      })
    });

    if (value === null || typeof value === 'undefined') {
      delete changedElement.style[property];
    }
  } else {
    previousValue =
      element.displayStyle &&
      element.displayStyle[display] &&
      element.displayStyle[display][property];

    changedElement = Object.assign({}, element, {
      displayStyle: Object.assign({}, element.displayStyle, {
        [display]: Object.assign({}, element.displayStyle && element.displayStyle[display], {
          [property]: value
        })
      })
    });

    if (value === null || typeof value === 'undefined') {
      delete changedElement.displayStyle[display][property];
    }
  }


  return {
    doc: changeDocContext(doc, context, {
      [elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
