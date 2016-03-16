import forEach from 'lodash.foreach';

import getId from './helpers/get-id';

export default (data, action) => {
  const destinationId = action.destination.id;
  const destinationPosition = action.destination.position;
  const sourceId = action.element.id || getId(data);
  const changes = {
    [sourceId]: Object.assign({
      id: sourceId,
      parent: destinationId
    }, action.element)
  };

  if (action.childrenElements) {
    forEach(action.childrenElements, (childElement) => {
      changes[childElement.id] = Object.assign({}, childElement);
    });
  }

  const children = changes[destinationId] && changes[destinationId].children ||
                   data[destinationId].children && data[destinationId].children.slice(0) ||
                   [];
  children.splice(destinationPosition, 0, sourceId);
  changes[destinationId] = Object.assign({}, data[destinationId], {
    children
  });

  return {
    data: Object.assign({}, data, changes),
    revertAction: {
      type: 'remove',
      elementId: sourceId
    }
  };
};
