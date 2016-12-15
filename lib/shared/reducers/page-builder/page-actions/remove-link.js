import changeDocContext from './helpers/change-doc-context';

/**
 * Removes an element schema link (for 'dynamic' elements)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId       (for 'dynamic' elements)
 *  - context         (for 'dynamic' elements)
 *  - schemaId        (for templates links)
 *  - linkElementId
 *  - index
 */
export default (doc, action) => {
  const {linkElementId, index} = action;

  // expected results
  let newDoc;
  let revertAction;

  if (action.elementId) {
    const {elementId, context} = action;

    // doc context data object
    const data = doc[context];

    // target element
    const element = data[elementId];
    const currentSchemaLinks = element.props.schemaLinks;

    // changes
    const newElementLinks = currentSchemaLinks[linkElementId].slice(0);
    const removedLink = (newElementLinks.splice(index, 1))[0];
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: newElementLinks
    });

    if (!newElementLinks.length) {
      delete schemaLinksChanged[linkElementId];
    }

    // change element
    const changedElement = Object.assign({}, element, {
      props: Object.assign({}, element.props, {
        schemaLinks: schemaLinksChanged
      })
    });

    // doc and revert
    newDoc = changeDocContext(doc, context, {
      [elementId]: changedElement
    });
    revertAction = {
      type: 'addLink',
      elementId,
      context,
      linkElementId,
      property: removedLink.property,
      action: removedLink.action
    };
  } else if (action.schemaId) {
    const {schemaId} = action;

    // template links
    const links = doc.links || {};

    // template schema links
    const currentSchemaLinks = links[schemaId] || {};

    // changes
    const newElementLinks = currentSchemaLinks[linkElementId].slice(0);
    const removedLink = (newElementLinks.splice(index, 1))[0];
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: newElementLinks
    });

    if (!newElementLinks.length) {
      delete schemaLinksChanged[linkElementId];
    }

    // doc and revert
    newDoc = Object.assign({}, doc, {
      links: Object.assign({}, doc.links, {
        [schemaId]: schemaLinksChanged
      })
    });
    revertAction = {
      type: 'addLink',
      schemaId,
      linkElementId,
      property: removedLink.property,
      action: removedLink.action
    };
  } else {
    throw new Error('Invalid action properties in addLink');
  }

  return {
    doc: newDoc,
    revertAction
  };
};
