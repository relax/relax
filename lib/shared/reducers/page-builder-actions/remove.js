import removeChildren from './helpers/remove-children';

/**
 * Removes an element
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - context
 */
export default (doc, action) => {
  const {elementId, context} = action;

  // doc context data object
  const data = Object.assign({}, doc[context]);

  // target element
  const element = data[elementId];
  const elementChildren = element.children;
  const parentChildren = data[element.parent].children.slice(0);
  const positionInParent = parentChildren.indexOf(element.id);

  // remove from parent children
  parentChildren.splice(positionInParent, 1);
  data[element.parent] = Object.assign({}, data[element.parent], {
    children: parentChildren
  });

  // remove element children
  let childrenElements = null; // For revert action
  if (elementChildren && elementChildren.constructor === Array) {
    childrenElements = removeChildren(elementChildren, data);
  }

  // remove element
  const removedElement = data[elementId];
  delete data[elementId];

  return {
    doc: Object.assign({}, doc, {
      [context]: data
    }),
    revertAction: {
      type: 'add',
      element: removedElement,
      childrenElements,
      destination: {
        id: element.parent,
        position: positionInParent,
        context
      }
    }
  };
};
