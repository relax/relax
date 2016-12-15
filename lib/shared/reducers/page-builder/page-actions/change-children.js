import addChildren from './helpers/add-children';
import removeChildren from './helpers/remove-children';

/**
 * Changes an element children
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - children
 *  - elements
 *  - context
 */
export default (doc, action) => {
  const {elementId, children, elements, context} = action;

  // data from doc context
  const data = doc[context];
  const newData = Object.assign({}, data);

  // target element
  const element = data[elementId];
  const previousChildren = element.children;

  // delete previous children
  let previousElements = {};
  if (previousChildren && previousChildren.constructor === Array) {
    previousElements = removeChildren(previousChildren, newData);
  }

  // new children
  let newChildren = children.slice(0);
  const res = addChildren(
    data,
    newChildren,
    elementId,
    elements
  );
  Object.assign(newData, res.changes);
  newChildren = res.children;

  // change element children
  newData[elementId] = Object.assign({}, element, {
    children: newChildren
  });

  return {
    doc: Object.assign({}, doc, {
      [context]: newData
    }),
    revertAction: Object.assign({}, action, {
      elements: previousElements,
      children: previousChildren
    })
  };
};
