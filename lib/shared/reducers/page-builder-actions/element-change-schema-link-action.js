export default (data, action) => {
  const element = data[action.elementId];
  const currentSchemaLinks = element.props.schemaLinks;
  const newProperties = currentSchemaLinks[action.propertyId].slice(0);
  const oldAction = newProperties[action.index].action;

  newProperties.splice(action.index, 1, Object.assign({}, newProperties[action.index], {
    action: action.value
  }));

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
    revertAction: Object.assign({}, action, {
      value: oldAction
    })
  };
};
