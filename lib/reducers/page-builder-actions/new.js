import forEach from 'lodash.foreach';

import elements from '../../components/elements';
import getId from './helpers/get-id';

export default (data, action) => {
  const destinationId = action.destination.id;
  const destinationPosition = action.destination.position;
  const sourceId = getId(data);
  const changes = {
    [sourceId]: {
      parent: destinationId,
      id: sourceId,
      ...action.element
    }
  };

  if (elements[action.element.tag].defaultChildren) {
    const defaultChildren = elements[action.element.tag].defaultChildren;
    if (defaultChildren.constructor === Array) {
      forEach(defaultChildren, (child) => {
        const childId = getId(data);
        changes[childId] = Object.assign({}, child, {
          parent: sourceId,
          id: childId
        });
        changes[sourceId].children = changes[sourceId].children || [];
        changes[sourceId].children.push(childId);
      });
    }
  }

  // Destination
  if (!data[destinationId] && destinationId === 'body') {
    changes.body = {
      id: 'body',
      tag: 'body',
      children: [sourceId]
    };
  } else {
    const children = changes[destinationId] && changes[destinationId].children || data[destinationId].children && data[destinationId].children.slice(0) || [];
    children.splice(destinationPosition, 0, sourceId);
    changes[destinationId] = Object.assign({}, data[destinationId], {
      children
    });
  }

  return {
    data: Object.assign({}, data, changes),
    revertAction: {
      type: 'remove',
      elementId: sourceId
    }
  };
};
