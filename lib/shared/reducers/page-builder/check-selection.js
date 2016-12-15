export default (state) => {
  const changes = {
    selected: state.selected,
    overed: state.overed,
    linkingData: state.linkingData
  };

  // check if selected exists
  let selectedElement;
  if (changes.selected) {
    const {id, context} = changes.selected;
    const {doc} = getDocFromContext(state, context);

    selectedElement = doc[context] && doc[context][id];

    if (!selectedElement) {
      changes.selected = null;
    }
  }

  // check if overed exists
  let overedElement;
  if (changes.overed) {
    const {id, context} = changes.overed;
    const {doc} = getDocFromContext(state, context);

    overedElement = doc[context] && doc[context][id];

    if (!overedElement) {
      changes.overed = null;
    }
  }

  // if linking data mode disable select elements
  if (state.menuTab === 'link' && changes.selected) {
    changes.selected = null;
  }

  // Check if inside the focused element
  // if (state.focusElement && state.data === _data) {
  //   if (changes.overedId && !inPath(changes.overedId, state.focusElementId, data)) {
  //     changes.overedId = null;
  //   }
  //   if (changes.selectedId && !inPath(changes.selectedId, state.focusElementId, data)) {
  //     changes.selectedId = null;
  //   }
  // }

  if (changes.selected) {
    const {doc, isTemplate} = getDocFromContext(state, changes.selected.context);

    // Check links to this element
    const elementLinks = isTemplate &&
      get(state, ['template', 'links', state.type, selectedElement.id], []);
    if (isTemplate) {
      selectedElement = Object.assign({}, selectedElement, {
        props: Object.assign({}, selectedElement.props)
      });
      links({
        element: selectedElement,
        elementProps: selectedElement.props,
        elementLinks,
        values: state.doc
      });
    }

    changes.selectedElement = selectedElement;
    changes.selectedParent = selectedElement && selectedElement.parent && {
      id: selectedElement.parent,
      context: changes.selected.context
    };
    changes.selectedPath = selectedElement && getElementPath(selectedElement, doc[changes.selected.context]);
    changes.selectedIsTemplate = isTemplate;
    changes.selectedLinks = elementLinks;
  } else {
    changes.selectedElement = null;
    changes.selectedParent = null;
    changes.selectedPath = [];
    changes.selectedIsTemplate = false;
  }

  if (state.linkingData) {
    const {id, context} = changes.linkingData;
    const {doc} = getDocFromContext(state, context);

    const linkingDataElement = doc[context] && doc[context][id];

    if (!linkingDataElement) {
      changes.linkingData = null;
    } else {
      changes.linkingDataElement = linkingDataElement;
    }
  }

  return Object.assign({}, state, changes);
};
