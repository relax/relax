import changeDocContext from './helpers/change-doc-context';

/**
 * Removes an element schema link (for 'dynamic' elements)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - propertyId
 *  - index
 *  - context
 */
export default (doc, action) => {
  const {elementId, propertyId, index, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const currentSchemaLinks = element.props.schemaLinks;

  // changes
  const newProperties = currentSchemaLinks[propertyId].slice(0);
  const removedProperty = (newProperties.splice(index, 1))[0];

  const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
    [propertyId]: newProperties
  });
  const changedElement = Object.assign({}, element, {
    props: Object.assign({}, element.props, {
      schemaLinks: schemaLinksChanged
    })
  });

  return {
    doc: changeDocContext(doc, context, {
      [elementId]: changedElement
    }),
    revertAction: {
      type: 'elementAddSchemaLink',
      elementId,
      propertyId,
      linkElementId: removedProperty.elementId,
      action: removedProperty.action,
      context
    }
  };
};
