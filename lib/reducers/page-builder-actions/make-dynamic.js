import getId from './helpers/get-id';

export default (data, action) => {
  const element = data[action.elementId];
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
    data: Object.assign({}, data, changes),
    revertAction: [
      {
        type: 'move',
        source: {
          id: element.id
        },
        destination: {
          id: destinationId,
          position: destinationPosition
        }
      },
      {
        type: 'remove',
        elementId: dynamicElementId
      }
    ]
  };
};
