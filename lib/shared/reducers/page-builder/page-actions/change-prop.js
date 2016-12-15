import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element prop
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
  if (property === 'children') {
    previousValue = element.children || '';
    changedElement = Object.assign({}, element, {
      children: value,
      props: Object.assign({}, element.props, {
        [property]: value
      })
    });
  } else if (display === 'desktop') {
    previousValue = element.props && element.props[property];
    changedElement = Object.assign({}, element, {
      props: Object.assign({}, element.props, {
        [property]: value
      })
    });
  } else {
    previousValue =
      element.displayProps &&
      element.displayProps[display] &&
      element.displayProps[display][property];
    changedElement = Object.assign({}, element, {
      displayProps: Object.assign({}, element.displayProps, {
        [display]: Object.assign({}, element.displayProps && element.displayProps[display], {
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
