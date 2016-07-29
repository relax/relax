import changeDocContext from './helpers/change-doc-context';
import getId from './helpers/get-id';

/**
 * Wraps an element in a DynamicList element
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - context
 */
export default (doc, action) => {
  const {elementId, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const destinationId = element.parent;
  const destinationPosition = data[destinationId].children.indexOf(element.id);

  // Add new dynamic element
  const dynamicElementId = getId(data);
  const newChildren = data[destinationId].children.slice(0);
  newChildren.splice(destinationPosition, 1, dynamicElementId);
  const changes = {
    [dynamicElementId]: {
      parent: destinationId,
      id: dynamicElementId,
      tag: 'DynamicList',
      children: [element.id]
    },
    [destinationId]: Object.assign({}, data[destinationId], {
      children: newChildren
    }),
    [element.id]: Object.assign({}, element, {
      parent: dynamicElementId
    })
  };

  return {
    doc: changeDocContext(doc, context, changes),
    revertAction: [
      {
        type: 'move',
        source: {
          id: element.id,
          context
        },
        destination: {
          id: destinationId,
          position: destinationPosition,
          context
        }
      },
      {
        type: 'remove',
        elementId: dynamicElementId,
        context
      }
    ]
  };
};
