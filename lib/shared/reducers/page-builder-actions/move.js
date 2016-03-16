export default (data, action) => {
  let destinationPosition = action.destination.position;
  const destinationId = action.destination.id;
  const sourceId = action.source.id;
  const sourceElement = data[sourceId];

  // remove from old parent children
  const parentElement = data[sourceElement.parent];
  const parentChildren = parentElement.children.slice(0);
  const oldPosition = parentElement.children.indexOf(sourceId);
  parentChildren.splice(oldPosition, 1);
  const changes = {
    [parentElement.id]: Object.assign({}, parentElement, {
      children: parentChildren
    })
  };

  if (sourceElement.parent !== destinationId) {
    changes[sourceId] = Object.assign({}, sourceElement, {
      parent: destinationId
    });
  } else if (oldPosition < destinationPosition) {
    destinationPosition--;
  }

  const children =
    changes[destinationId] && changes[destinationId].children ||
    data[destinationId].children && data[destinationId].children.slice(0) ||
    [];
  children.splice(destinationPosition, 0, sourceId);
  changes[destinationId] = Object.assign({}, data[destinationId], {
    children
  });

  return {
    data: Object.assign({}, data, changes),
    revertAction: {
      type: 'move',
      source: {
        id: action.source.id
      },
      destination: {
        id: sourceElement.parent,
        position: oldPosition
      }
    }
  };
};
