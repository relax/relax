import forEach from 'lodash.foreach';

import getId from './helpers/get-id';

export default (data, action) => {
  const element = data[action.elementId];
  const previousChildren = [];
  const newData = Object.assign({}, data);
  if (element.children && element.children.constructor === Array) {
    forEach(element.children, (child) => {
      previousChildren.push(Object.assign({}, data[child.id]));
      delete newData[child.id];
    });
  }
  const changes = {};
  const newChildren = [];
  forEach(action.children, (child) => {
    const childId = getId(data);
    newChildren.push(childId);
    const newChild = Object.assign({}, child, {
      id: childId,
      parent: element.id
    });
    changes[childId] = newChild;
  });
  changes[element.id] = Object.assign({}, element, {
    children: newChildren
  });

  return {
    data: Object.assign(newData, changes),
    revertAction: Object.assign({}, action, {
      children: previousChildren
    })
  };
};
