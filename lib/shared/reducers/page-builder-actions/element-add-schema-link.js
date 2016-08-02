import changeDocContext from './helpers/change-doc-context';

/**
 * Adds a schema link to an element (for 'dynamic' elements)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - linkElementId
 *  - propertyId
 *  - action
 *  - context
 */
export default (doc, actionProps) => {
  const {elementId, linkElementId, propertyId, action, context} = actionProps;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];

  // link object
  const newLink = {
    elementId: linkElementId,
    action
  };

  // changes
  const currentSchemaLinks = element.props && element.props.schemaLinks || {};
  const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
    [propertyId]: [...(currentSchemaLinks[propertyId] || []), newLink]
  });

  const changedElement = Object.assign({}, element, {
    props: Object.assign({}, element.props || {}, {
      schemaLinks: schemaLinksChanged
    })
  });

  return {
    doc: changeDocContext(doc, context, {
      [elementId]: changedElement
    }),
    revertAction: {
      type: 'elementRemoveSchemaLink',
      elementId,
      propertyId,
      index: schemaLinksChanged[propertyId].length - 1,
      context
    }
  };
};
