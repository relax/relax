import getElementPath from './get-element-path';
import inPath from './in-path';

export default (state, _data) => {
  const data = _data || state.data;
  const changes = {
    selectedId: data[state.selectedId] && state.selectedId,
    overedId: data[state.overedId] && state.overedId
  };

  // Check if inside the focused element
  if (state.focusElementId && state.data === _data) {
    if (changes.overedId && !inPath(changes.overedId, state.focusElementId, data)) {
      changes.overedId = null;
    }
    if (changes.selectedId && !inPath(changes.selectedId, state.focusElementId, data)) {
      changes.selectedId = null;
    }
  }

  if (changes.selectedId) {
    const selectedElement = data[changes.selectedId];
    changes.selectedElement = selectedElement;
    changes.selectedParent = selectedElement && selectedElement.parent;
    changes.selectedPath = selectedElement && getElementPath(selectedElement, data);
    changes.selectedId = selectedElement && changes.selectedId;
  }

  if (state.linkingDataElementId) {
    const linkingDataElement = data[state.linkingDataElementId];
    changes.linkingDataElement = linkingDataElement;
    changes.linkingDataElementId = linkingDataElement && state.linkingDataElementId;
  }

  return Object.assign({}, state, changes);
};
