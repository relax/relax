import forEach from 'lodash.foreach';

import changeDocContext from './helpers/change-doc-context';
import getId from './helpers/get-id';

/**
 * Adds a new element to a destination
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - destination
 *    - id
 *    - context
 *    - position
 *  - element
 *  - childrenElements (optional)
 */
export default (doc, action) => {
  const {destination, element, childrenElements} = action;

  // destination
  const destinationId = destination.id;
  const destinationPosition = destination.position;
  const destinationContext = destination.context;

  // doc context data object
  const data = doc[destinationContext];

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
  if (childrenElements) {
    const elementChildren = [];

    forEach(childrenElements, (childElement) => {
      const childId = getId(doc[destinationContext]);

      elementChildren.push(childId);
      changes[childId] = Object.assign({}, childElement, {
        id: childId,
        parent: sourceId
      });
    });

    changes[sourceId].children = elementChildren;
  }

  // add element to destination
  const destinationElement = data[destinationId];
  const children = destinationElement.children && destinationElement.children.slice(0) || [];

  children.splice(destinationPosition, 0, sourceId);
  changes[destinationId] = Object.assign({}, destinationElement, {
    children
  });

  return {
    doc: changeDocContext(doc, destinationContext, changes),
    revertAction: {
      type: 'remove',
      elementId: sourceId,
      context: destinationContext
    }
  };
};
