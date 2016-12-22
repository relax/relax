import actionTypes from 'actions';
import elements from 'elements';
import forEach from 'lodash/forEach';
import get from 'lodash/get';

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
      const {elementId, context} = action;
      const isExpanded =
        get(state, ['expanded', context.doc, context.property, elementId], false) ||
        get(state, ['userExpanded', context.doc, context.property, elementId], false);

      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [context.doc]: Object.assign({}, state.expanded[context.doc], {
            [context.property]: Object.assign(
              {},
              state.expanded[context.doc] && state.expanded[context.doc][context.property],
              {[elementId]: !isExpanded}
            )
          })
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [context.doc]: Object.assign({}, state.userExpanded[context.doc], {
            [context.property]: Object.assign(
              {},
              state.userExpanded[context.doc] && state.userExpanded[context.doc][context.property],
              {[elementId]: !isExpanded}
            )
          })
        })
      });
    }
    case actionTypes.pbExpandAll: {
      const allExpanded = {};

      forEach(state.fragments, (fragment, docName) => {
        allExpanded[docName] = {};

        forEach(fragment.doc, (docProperty, docPropertyName) => {
          if (typeof docProperty === 'object' && docProperty.hasOwnProperty('Body')) {
            allExpanded[docName][docPropertyName] = {};

            forEach(docProperty, (element, elementId) => {
              allExpanded[docName][docPropertyName][elementId] = true;
            });
          }
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
