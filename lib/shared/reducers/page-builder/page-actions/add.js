import cloneDeep from 'lodash/cloneDeep';
import elements from 'elements';
import forEach from 'lodash/forEach';

import addChildren from './helpers/add-children';
import changeDocContext from './helpers/change-doc-context';
import getId from './helpers/get-id';

/**
 * Adds an element to a destination
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - type
 *  - destination
 *    - id
 *    - position
 *  - context
 *    - doc
 *    - property
 *  - element
 *  - childrenElements (optional)
 */
export default (doc, action) => {
  const {type, destination, element, childrenElements, context} = action;

  // destination
  const destinationId = destination.id;
  const destinationPosition = destination.position;

  // doc context data object
  let data = doc[context.property];

  if (!data && type === 'new') {
    data = {};
  }

  // element to be added
  const sourceId = getId(data);

  // changes to be made to the doc context
  const changes = {
    [sourceId]: Object.assign({}, element, {
      id: sourceId,
      parent: destinationId
    })
  };

  // element being added might have children
  if (element.children && childrenElements) {
    const result = addChildren(
      doc[context.property],
      element.children,
      sourceId,
      childrenElements
    );

    Object.assign(changes, result.changes);
    changes[sourceId].children = result.children;
  }

  // new element default children
  if (type === 'new') {
    const ElementClass = elements[element.tag];

    if (ElementClass && ElementClass.defaultChildren) {
      const defaultChildren = ElementClass.defaultChildren;

      if (defaultChildren.constructor === Array) {
        forEach(defaultChildren, (child) => {
          const childId = getId(data);
          changes[childId] = Object.assign(cloneDeep(child), {
            parent: sourceId,
            id: childId
          });
          changes[sourceId].children = changes[sourceId].children || [];
          changes[sourceId].children.push(childId);
        });
      }
    }
  }

  // add element to destination
  let destinationElement = data[destinationId];

  if (!destinationElement && destinationId === 'body') {
    destinationElement = {
      id: 'body',
      tag: 'body',
      children: []
    };
    changes.body = destinationElement;
  }

  const children = destinationElement.children && destinationElement.children.slice(0) || [];

  children.splice(destinationPosition, 0, sourceId);
  changes[destinationId] = Object.assign({}, destinationElement, {
    children
  });

  return {
    doc: changeDocContext(doc, context.property, changes),
    revertAction: {
      type: 'remove',
      elementId: sourceId,
      context
    }
  };
};
