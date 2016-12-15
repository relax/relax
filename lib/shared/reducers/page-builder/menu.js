import actionTypes from 'actions';
import elements from 'elements';
import forEach from 'lodash/forEach';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbSetMenuTab: {
      const changes = {
        menuTab: action.value
      };

      if (action.value === 'link') {
        const {selected, selectedElement} = state;
        const ElementClass = selectedElement && elements[selectedElement.tag];

        if (ElementClass && ElementClass.settings.dynamicLinkable) {
          changes.linkingData = selected;
          changes.focused = selected;
        }
      } else if (state.linkingData) {
        changes.selected = state.linkingData;
        changes.linkingData = null;
        changes.focused = null;
      }

      return Object.assign({}, state, changes);
    }
    case actionTypes.pbToggleExpandElement: {
      const {elementId} = action;
      const isExpanded =
        state.expanded[context] && state.expanded[context][elementId] ||
        state.userExpanded[context] && state.userExpanded[context][elementId];

      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [context]: Object.assign({}, state.expanded[context], {
            [action.elementId]: !isExpanded
          })
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [context]: Object.assign({}, state.expanded[context], {
            [action.elementId]: !isExpanded
          })
        })
      });
    }
    case actionTypes.pbExpandAll: {
      const allExpanded = {};

      forEach(state.doc, (data, contextIt) => {
        allExpanded[contextIt] = {};

        forEach(data, (element, elementId) => {
          allExpanded[contextIt][elementId] = true;
        });
      });

      return Object.assign({}, state, {
        userExpanded: allExpanded
      });
    }
    case actionTypes.pbCollapseAll:
      return Object.assign({}, state, {
        expanded: {},
        userExpanded: {}
      });
    case actionTypes.pbChangeLinkTabSchemaId:
      return Object.assign({}, state, {
        linkTabSchemaId: action.schemaId
      });
    default:
      return state;
  }
};
