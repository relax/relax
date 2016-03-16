import cloneDeep from 'lodash.clonedeep';

import cloneChildren from './helpers/clone-children';
import getId from './helpers/get-id';

export default (data, action) => {
  const sourceId = getId(data);
  const changes = {};
  const toDuplicate = data[action.elementId];
  const destinationId = toDuplicate.parent;
  const destinationPosition = data[toDuplicate.parent].children.indexOf(toDuplicate.id) + 1;

  const cloned = cloneDeep(toDuplicate);
  cloned.id = sourceId;
  if (cloned.children && cloned.children.constructor === Array) {
    cloned.children = cloneChildren(cloned.children, data, changes, sourceId);
  }
  changes[sourceId] = cloned;

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
      type: 'remove',
      elementId: sourceId
    }
  };
};
