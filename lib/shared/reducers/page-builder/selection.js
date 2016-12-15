import actionTypes from 'actions';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbSelectElement: {
      const {elementId} = action;
      let result;

      if (isTemplate) {
        result = checkOverAndSelected(Object.assign({}, state, {
          selected: elementId === 'body' ? null : {
            id: elementId,
            context
          }
        }));
      } else if (!elementId || !context) {
        result = checkOverAndSelected(Object.assign({}, state, {
          selected: null
        }));
      } else {
        const data = doc[context];

        const expandedChanges = {};
        let element = data[elementId];
        if (element && !currentSymbolEditing) {
          while (element && element.parent) {
            element = data[element.parent];

            if (element && element.id !== 'body') {
              expandedChanges[element.id] = true;
            }
          }
        }

        const newExpandedContext = Object.assign(
          {},
          state.expanded && state.expanded[context],
          expandedChanges
        );

        result = checkOverAndSelected(Object.assign({}, state, {
          expanded: Object.assign({}, state.expanded, {
            [context]: newExpandedContext
          }),
          selected: elementId === 'body' ? null : {
            id: elementId,
            context
          }
        }));
      }

      return result;
    }
    case actionTypes.pbOverElement: {
      const {elementId} = action;
      return checkOverAndSelected(Object.assign({}, state, {
        overed: {
          id: elementId,
          context
        }
      }));
    }
    case actionTypes.pbOutElement: {
      const {elementId} = action;
      if (state.overed &&
          state.overed.id === elementId &&
          state.overed.context === context) {
        return checkOverAndSelected(Object.assign({}, state, {
          overed: null
        }));
      }
      return state;
    }
    default:
      return state;
  }
}
