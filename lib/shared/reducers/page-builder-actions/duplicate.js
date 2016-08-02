import cloneDeep from 'lodash.clonedeep';

import changeDocContext from './helpers/change-doc-context';
import cloneChildren from './helpers/clone-children';
import getId from './helpers/get-id';

/**
 * Duplicates an element
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - context
 */
export default (doc, action) => {
  const {elementId, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const destinationId = element.parent;
  const destinationChildren = data[destinationId].children;
  const destinationPosition = destinationChildren.indexOf(element.id) + 1;

  // clone element
  const changes = {};
  const cloneId = getId(data);
  const cloneElement = cloneDeep(element);
  const cloneChilds = cloneElement.children;
  cloneElement.id = cloneId;

  if (cloneChilds && cloneChilds.constructor === Array) {
    cloneElement.children = cloneChildren(
      cloneChilds,
      data,
      changes,
      cloneId
    );
  }

  // add cloned to changes
  changes[cloneId] = cloneElement;

  // add clone to parent
  const newChildren = destinationChildren.slice(0);
  newChildren.splice(destinationPosition, 0, cloneId);

  changes[destinationId] = Object.assign({}, data[destinationId], {
    children: newChildren
  });

  return {
    doc: changeDocContext(doc, context, changes),
    revertAction: {
      type: 'remove',
      elementId: cloneId,
      context
    }
  };
};
