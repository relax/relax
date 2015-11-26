export default (data, action) => {
  const element = data[action.elementId];
  const newLink = {
    elementId: action.linkElementId,
    action: action.action
  };
  const currentSchemaLinks = element.props && element.props.schemaLinks || {};
  const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
    [action.propertyId]: [...(currentSchemaLinks[action.propertyId] || []), newLink]
  });

  const changedElement = Object.assign({}, element, {
    props: Object.assign({}, element.props || {}, {
      schemaLinks: schemaLinksChanged
    })
  });

  return {
    data: Object.assign({}, data, {
      [action.elementId]: changedElement
    }),
    revertAction: {
      type: 'elementRemoveSchemaLink',
      elementId: action.elementId,
      propertyId: action.propertyId,
      index: schemaLinksChanged[action.propertyId].length - 1
    }
  };
};
