export default (procElement, options) => {
  const result = {
    selectable: false,        // if element is selectable
    childrenEditable: false   // if element children/content is editable
  };

  // options descontructuring
  const {
    editable,
    editing,
    building
  } = options;

  // processed element descontructuring
  const {
    hasDataLink,
    hasPropLink
  } = procElement;

  // calculate admin state
  if (editable) {
    // element is editable
    result.childrenEditable = editing;
    result.selectable = editing && building;
  } else {
    // children are editable if there is a builder link
    result.childrenEditable = editing && hasDataLink;

    // is selectable if some prop is linked
    result.selectable = editing && building && hasPropLink;
  }

  return result;
};
