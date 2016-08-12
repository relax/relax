import getElementPath from './get-element-path';
// import inPath from './in-path';

export default (state, _doc) => {
  const doc = _doc || state.doc;

  const changes = {
    selected: state.selected,
    overed: state.overed,
    linkingData: state.linkingData
  };

  // check if selected exists
  let selectedElement;
  if (changes.selected) {
    const {id, context} = changes.selected;
    selectedElement = doc[context] && doc[context][id];

    if (!selectedElement) {
      changes.selected = null;
    }
  }

  // check if overed exists
  let overedElement;
  if (changes.overed) {
    const {id, context} = changes.overed;
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
    changes.selectedElement = selectedElement;
    changes.selectedParent = selectedElement && selectedElement.parent && {
      id: selectedElement.parent,
      context: changes.selected.context
    };
    changes.selectedPath = selectedElement && getElementPath(selectedElement, doc[changes.selected.context]);
  } else {
    changes.selectedElement = null;
    changes.selectedParent = null;
    changes.selectedPath = [];
  }

  if (state.linkingData) {
    const {id, context} = changes.linkingData;
    const linkingDataElement = doc[context] && doc[context][id];

    if (!linkingDataElement) {
      changes.linkingData = null;
    } else {
      changes.linkingDataElement = linkingDataElement;
    }
  }

  return Object.assign({}, state, changes);
};
