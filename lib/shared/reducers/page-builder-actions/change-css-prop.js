import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element css property
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
    previousValue = element.css && element.css[property];
    changedElement = Object.assign({}, element, {
      css: Object.assign({}, element.css, {
        [property]: value
      })
    });
  } else {
    previousValue =
      element.displayCss &&
      element.displayCss[display] &&
      element.displayCss[display][property];
    changedElement = Object.assign({}, element, {
      displayCss: Object.assign({}, element.displayCss, {
        [display]: Object.assign({}, element.displayCss && element.displayCss[display], {
          [property]: value
        })
      })
    });
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
