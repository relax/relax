import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element position property
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - property
 *  - display
 *  - value
 *  - context
 */
export default (doc, action) => {
  const {elementId, property, display, value, context} = action;

  // doc context data object
  const data = doc[context];

  // position defaults
  const defaults = {
    position: 'static',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    zIndex: '1'
  };

  // target element
  const element = data[elementId];
  let previousValue;
  let changedElement;

  // changes
  if (display === 'desktop') {
    const pos = element.position;
    previousValue = pos && pos[property] || defaults[property];

    changedElement = Object.assign({}, element, {
      position: Object.assign({}, pos || defaults, {
        [property]: value
      })
    });
  } else {
    const dPos = element.displayPosition;
    previousValue =
      dPos &&
      dPos[display] &&
      dPos[display][property];

    changedElement = Object.assign({}, element, {
      displayPosition: Object.assign({}, dPos, {
        [display]: Object.assign(
          {},
          dPos && dPos[display],
          {[property]: value}
        )
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
