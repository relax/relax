import addChildren from './helpers/add-children';
import getId from './helpers/get-id';
import removeChildren from './helpers/remove-children';

/**
 * Moves an element to another position
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - source
 *    - id
 *    - context
 *  - destination
 *    - id
 *    - position
 *    - context
 */
export default (doc, action) => {
  const {source, destination} = action;
  const diferentContexts = source.context !== destination.context;
  const newDoc = Object.assign({}, doc);

  // Source
  let sourceParentId;
  let sourceElementPosition;
  let sourceElement;
  let sourceChildElements;
  {
    const {id, context} = source;

    // doc context data object
    const data = Object.assign({}, newDoc[context]);

    // target element
    const element = data[id];

    // parent
    const elementParent = data[element.parent];
    const parentChildren = elementParent.children.slice(0);
    sourceElementPosition = parentChildren.indexOf(id);
    parentChildren.splice(sourceElementPosition, 1);
    sourceParentId = element.parent;

    data[elementParent.id] = Object.assign({}, elementParent, {
      children: parentChildren
    });

    if (diferentContexts) {
      // remove target element (gonna change context)
      sourceElement = data[id];

      // remove children as well
      const children = sourceElement.children;
      if (children && children.constructor === Array) {
        sourceChildElements = removeChildren(children, data);
      }

      delete data[id];
    } else if (element.parent !== destination.id) {
      data[id] = Object.assign({}, element, {
        parent: destination.id
      });
    }

    // apply changes to doc
    Object.assign(newDoc, {
      [context]: data
    });
  }

  // Destination
  let sourceId;
  {
    const {id, position, context} = destination;
    sourceId = source.id;

    // doc context data object
    const data = Object.assign({}, newDoc[context]);

    // target element
    const element = data[id];

    // add element if different context
    if (diferentContexts) {
      sourceId = getId(data);

      // children
      if (sourceChildElements) {
        const res = addChildren(
          data,
          sourceElement.children,
          sourceId,
          sourceChildElements
        );
        sourceElement.children = res.children;
        Object.assign(data, res.changes);
      }

      data[sourceId] = Object.assign({}, sourceElement, {
        id: sourceId,
        parent: id
      });
    }

    // children calc
    const newChildren = element.children && element.children.slice(0) || [];
    newChildren.splice(position, 0, sourceId);
    data[id] = Object.assign({}, element, {
      children: newChildren
    });

    // apply changes to doc
    Object.assign(newDoc, {
      [context]: data
    });
  }

  return {
    doc: newDoc,
    revertAction: {
      type: 'move',
      source: {
        id: sourceId,
        context: destination.context
      },
      destination: {
        id: sourceParentId,
        position: sourceElementPosition,
        context: source.context
      }
    }
  };
};
