import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element schema link action (for 'dynamic' elements) or template
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId       (for 'dynamic' elements)
 *  - context         (for 'dynamic' elements)
 *  - schemaId        (for templates links)
 *  - linkElementId
 *  - index
 *  - value
 */
export default (doc, action) => {
  const {linkElementId, index, value} = action;

  // expected results
  let newDoc;
  let oldAction;

  if (action.elementId) {
    const {elementId, context} = action;

    // doc context data object
    const data = doc[context];

    // target element
    const element = data[elementId];
    const currentSchemaLinks = element.props.schemaLinks;
    const newProperties = currentSchemaLinks[linkElementId].slice(0);
    oldAction = newProperties[index].action;

    // changes
    newProperties.splice(index, 1, Object.assign({}, newProperties[index], {
      action: value
    }));
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: newProperties
    });

    // change element
    const changedElement = Object.assign({}, element, {
      props: Object.assign({}, element.props || {}, {
        schemaLinks: schemaLinksChanged
      })
    });

    // doc and revert
    newDoc = changeDocContext(doc, context, {
      [elementId]: changedElement
    });
  } else if (action.schemaId) {
    const {schemaId} = action;

    // template links
    const links = doc.links || {};

    // template schema links
    const currentSchemaLinks = links[schemaId] || {};
    const newProperties = currentSchemaLinks[linkElementId].slice(0);
    oldAction = newProperties[index].action;

    // changes
    newProperties.splice(index, 1, Object.assign({}, newProperties[index], {
      action: value
    }));
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: newProperties
    });

    // doc and revert
    newDoc = Object.assign({}, doc, {
      links: Object.assign({}, doc.links, {
        [schemaId]: schemaLinksChanged
      })
    });
  } else {
    throw new Error('Invalid action properties in addLink');
  }

  return {
    doc: newDoc,
    revertAction: Object.assign({}, action, {
      value: oldAction
    })
  };
};
