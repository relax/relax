import get from 'lodash/get';
import getContextFragment from 'helpers/page-builder/get-context-fragment';
import getElementPath from 'helpers/page-builder/get-element-path';
import links from 'helpers/traverser/links';

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
    const {doc} = getContextFragment(state, context);

    selectedElement = doc[context.property] && doc[context.property][id];

    if (!selectedElement) {
      changes.selected = null;
    }
  }

  // check if overed exists
  let overedElement;
  if (changes.overed) {
    const {id, context} = changes.overed;
    const {doc} = getContextFragment(state, context);

    overedElement = doc[context.property] && doc[context.property][id];

    if (!overedElement) {
      changes.overed = null;
    }
  }

  // if linking data mode disable select elements
  if (state.menuTab === 'link' && changes.selected) {
    changes.selected = null;
  }

  // Check if inside the focused element
  // TODO FIX THIS
  // if (state.focusElement && state.data === _data) {
  //   if (changes.overedId && !inPath(changes.overedId, state.focusElementId, data)) {
  //     changes.overedId = null;
  //   }
  //   if (changes.selectedId && !inPath(changes.selectedId, state.focusElementId, data)) {
  //     changes.selectedId = null;
  //   }
  // }

  if (changes.selected) {
    const {context} = changes.selected;
    const {doc} = getContextFragment(state, context);
    const isTemplate = context.doc === 'template';

    // Check links to this element
    const elementLinks = isTemplate && get(state, [
      'fragments', 'template', 'doc', 'links', state.type, selectedElement.id
    ], []) || [];

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
    changes.selectedPath = selectedElement && getElementPath(selectedElement, doc[context.property]);
    changes.selectedIsTemplate = isTemplate;
    changes.selectedLinks = elementLinks;
  } else {
    changes.selectedElement = null;
    changes.selectedParent = null;
    changes.selectedPath = [];
    changes.selectedLinks = [];
    changes.selectedIsTemplate = false;
  }

  if (state.linkingData) {
    const {id, context} = changes.linkingData;
    const {doc} = getContextFragment(state, context);

    const linkingDataElement = doc[context.property] && doc[context.property][id];

    if (!linkingDataElement) {
      changes.linkingData = null;
      changes.linkingDataElement = null;
    } else {
      changes.linkingDataElement = linkingDataElement;
    }
  } else {
    changes.linkingDataElement = null;
  }

  return Object.assign({}, state, changes);
};
