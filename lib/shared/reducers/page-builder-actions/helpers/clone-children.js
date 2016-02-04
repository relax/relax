import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import getId from './get-id';

export default function cloneChildren (children, data, changes, parentId) {
  const resultChildren = [];

  forEach(children, (childId) => {
    const newId = getId(data);
    const element = data[childId];
    const clonedChild = cloneDeep(element);
    clonedChild.id = newId;
    clonedChild.parent = parentId;
    if (clonedChild.children && clonedChild.children.constructor === Array) {
      clonedChild.children = cloneChildren(clonedChild.children, data, changes, newId);
    }
    changes[newId] = clonedChild;
    resultChildren.push(newId);
  });

  return resultChildren;
}
