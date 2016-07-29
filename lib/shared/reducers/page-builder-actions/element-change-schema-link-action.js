import changeDocContext from './helpers/change-doc-context';

/**
 * Changes an element schema link action (for 'dynamic' elements)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - propertyId
 *  - index
 *  - value
 *  - context
 */
export default (doc, action) => {
  const {elementId, propertyId, index, value, context} = action;

  // doc context data object
  const data = doc[context];

  // target element
  const element = data[elementId];
  const currentSchemaLinks = element.props.schemaLinks;
  const newProperties = currentSchemaLinks[propertyId].slice(0);
  const oldAction = newProperties[index].action;

  // changes
  newProperties.splice(index, 1, Object.assign({}, newProperties[index], {
    action: value
  }));

  const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
    [propertyId]: newProperties
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
    revertAction: Object.assign({}, action, {
      value: oldAction
    })
  };
};
