import changeDocContext from './helpers/change-doc-context';

/**
 * Adds a schema link to an element (for 'dynamic' elements) or template
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId       (for 'dynamic' elements)
 *  - context         (for 'dynamic' elements)
 *  - schemaId        (for templates links)
 *  - linkElementId
 *  - property
 *  - action
 */
export default (doc, actionProps) => {
  const {linkElementId, property, action} = actionProps;

  // link object
  const newLink = {
    property,
    action
  };

  // expected results
  let newDoc;
  let revertAction;

  if (actionProps.elementId) {
    const {elementId, context} = actionProps;

    // doc context data object
    const data = doc[context];

    // target element
    const element = data[elementId];

    // changes
    const currentSchemaLinks = element.props && element.props.schemaLinks || {};
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: [...(currentSchemaLinks[linkElementId] || []), newLink]
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
    revertAction = {
      type: 'removeLink',
      elementId,
      linkElementId,
      index: schemaLinksChanged[linkElementId].length - 1,
      context
    };
  } else if (actionProps.schemaId) {
    const {schemaId} = actionProps;

    // template links
    const links = doc.links || {};

    // template schema links
    const currentSchemaLinks = links[schemaId] || {};
    const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
      [linkElementId]: [...(currentSchemaLinks[linkElementId] || []), newLink]
    });

    // doc and revert
    newDoc = Object.assign({}, doc, {
      links: Object.assign({}, doc.links, {
        [schemaId]: schemaLinksChanged
      })
    });
    revertAction = {
      type: 'removeLink',
      schemaId,
      linkElementId,
      index: schemaLinksChanged[linkElementId].length - 1
    };
  } else {
    throw new Error('Invalid action properties in addLink');
  }

  return {
    doc: newDoc,
    revertAction
  };
};
