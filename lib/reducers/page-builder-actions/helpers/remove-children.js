import forEach from 'lodash.foreach';

export default function removeChildren (children, copiedData) {
  const childrenElements = {};
  forEach(children, (childId) => {
    const element = copiedData[childId];
    childrenElements[element.id] = Object.assign({}, element);
    if (element.children && element.children.constructor === Array) {
      Object.assign(childrenElements, removeChildren(element.children, copiedData));
    }
    delete copiedData[childId];
  });
  return childrenElements;
}
