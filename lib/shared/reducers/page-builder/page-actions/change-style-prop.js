import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element style property
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - display
 *  - property
 *  - value
 *  - context
 *    - doc
 *    - property
 */
export default (doc, action) => {
  const {elementId, display, property, value, context} = action;

  // doc context data object
  const data = doc[context.property];

  // target element
  const element = data[elementId];
  let previousValue;
  let changedElement;

  // changes
  if (display === 'desktop') {
    previousValue = element.styleProps && element.styleProps[property];
    changedElement = Object.assign({}, element, {
      styleProps: Object.assign({}, element.styleProps, {
        [property]: value
      })
    });

    if (value === null || typeof value === 'undefined') {
      delete changedElement.styleProps[property];

      if (!Object.keys(changedElement.styleProps).length) {
        delete changedElement.styleProps;
      }
    }
  } else {
    previousValue =
      element.displayStyleProps &&
      element.displayStyleProps[display] &&
      element.displayStyleProps[display][property];

    changedElement = Object.assign({}, element, {
      displayStyleProps: Object.assign({}, element.displayStyleProps, {
        [display]: Object.assign({}, element.displayStyleProps && element.displayStyleProps[display], {
          [property]: value
        })
      })
    });

    if (typeof value === 'undefined') {
      delete changedElement.displayStyleProps[display][property];

      if (!Object.keys(changedElement.displayStyleProps[display]).length) {
        delete changedElement.displayStyleProps[display];

        if (!Object.keys(changedElement.displayStyleProps).length) {
          delete changedElement.displayStyleProps;
        }
      }
    }
  }


  return {
    doc: changeDocContext(doc, context.property, {
      [elementId]: changedElement
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
