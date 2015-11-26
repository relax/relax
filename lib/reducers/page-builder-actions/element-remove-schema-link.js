export default (data, action) => {
  const element = data[action.elementId];
  const currentSchemaLinks = element.props.schemaLinks;
  const newProperties = currentSchemaLinks[action.propertyId].slice(0);
  const removedProperty = (newProperties.splice(action.index, 1))[0];

  const schemaLinksChanged = Object.assign({}, currentSchemaLinks, {
    [action.propertyId]: newProperties
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
      type: 'elementAddSchemaLink',
      elementId: action.elementId,
      propertyId: action.propertyId,
      linkElementId: removedProperty.elementId,
      action: removedProperty.action
    }
  };
};
