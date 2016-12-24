import cloneDeep from 'lodash/cloneDeep';
import elements from 'elements';
import forEach from 'lodash/forEach';
import changeDocContext from './helpers/change-doc-context';
import getId from './helpers/get-id';
import addChildren from './helpers/add-children';

/**
 * Adds an element to a destination
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - type
 *  - destination
 *    - id
 *    - context
 *    - position
 *  - element
 *  - childrenElements (optional)
 */
export default (doc, action) => {
  const {type, destination, element, childrenElements} = action;

  // destination
  const destinationId = destination.id;
  const destinationPosition = destination.position;
  const destinationContext = destination.context;

  // doc context data object
  let data = doc[destinationContext];

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
      doc[destinationContext],
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
    doc: changeDocContext(doc, destinationContext, changes),
    revertAction: {
      type: 'remove',
      elementId: sourceId,
      context: destinationContext
    }
  };
};
