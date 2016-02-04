import removeChildren from './helpers/remove-children';

export default (data, action) => {
  const element = data[action.elementId];
  const parentChildren = data[element.parent].children.slice(0);
  const positionInParent = parentChildren.indexOf(element.id);
  parentChildren.splice(positionInParent, 1);

  const copiedData = Object.assign({}, data, {
    [element.parent]: Object.assign({}, data[element.parent], {
      children: parentChildren
    })
  });

  let childrenElements = null; // For revert action
  if (element.children && element.children.constructor === Array) {
    childrenElements = removeChildren(element.children, copiedData);
  }

  const removedElement = copiedData[action.elementId];
  delete copiedData[action.elementId];

  return {
    data: copiedData,
    revertAction: {
      type: 'add',
      element: removedElement,
      childrenElements,
      destination: {
        id: element.parent,
        position: positionInParent
      }
    }
  };
};
