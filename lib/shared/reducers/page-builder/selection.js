import actionTypes from 'actions';
import invariant from 'invariant';

import getContextFragment from './helpers/get-context-fragment';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbSelectElement: {
      const {elementId, context} = action;
      let result;

      if (!elementId || !context) {
        result = Object.assign({}, state, {
          selected: null
        });
      } else {
        const {doc} = getContextFragment(state, context);
        const data = doc[context.property];

        invariant(data, 'Could not find element from context in select element action');

        const expandedChanges = {};
        let element = data[elementId];
        if (element) {
          while (element && element.parent) {
            element = data[element.parent];

            if (element && element.id !== 'body') {
              expandedChanges[element.id] = true;
            }
          }
        }

        const newExpandedContext = Object.assign({}, state.expanded[context.doc], {
          [context.property]: Object.assign(
            {},
            state.expanded[context.doc] && state.expanded[context.doc][context.property],
            expandedChanges
          )
        });

        result = Object.assign({}, state, {
          expanded: Object.assign({}, state.expanded, {
            [context.doc]: newExpandedContext
          }),
          selected: elementId === 'body' ? null : {
            id: elementId,
            context
          }
        });
      }

      return result;
    }
    case actionTypes.pbOverElement: {
      const {elementId, context} = action;

      return Object.assign({}, state, {
        overed: {
          id: elementId,
          context
        }
      });
    }
    case actionTypes.pbOutElement: {
      const {elementId, context} = action;

      if (state.overed &&
          state.overed.id === elementId &&
          state.overed.context === context) {
        return Object.assign({}, state, {
          overed: null
        });
      }

      return state;
    }
    default:
      return state;
  }
};
