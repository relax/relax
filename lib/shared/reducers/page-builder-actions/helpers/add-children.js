import forEach from 'lodash.foreach';

import getId from './get-id';

export default function addChildren (data, children, parentId, elements) {
  const changes = {};
  const newChildren = [];

  forEach(children, (childId) => {
    const newId = getId(data);
    newChildren.push(newId);

    // create new child element
    const childElement = Object.assign({}, elements[childId], {
      id: newId,
      parent: parentId
    });

    // check children
    if (childElement.children && childElement.children.constructor === Array) {
      const res = addChildren(
        data,
        childElement.children,
        newId,
        elements
      );
      Object.assign(changes, res.changes);
      childElement.children = res.children;
    }

    // add child to changes
    changes[newId] = childElement;
  });

  return {
    changes,
    children: newChildren
  };
}
