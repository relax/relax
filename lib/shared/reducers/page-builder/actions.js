import actionTypes from 'actions';

import doAction from './page-actions';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbDoAction: {
      const actionResult = doAction(doc, action.action);
      const revertAction = actionResult.revertAction;
      const currentTime = Date.now();
      let resultActions = dataFragment.actions;

      if (dataFragment.actions.length && lastActionTime && currentTime - lastActionTime < 500) {
        const lastAction = dataFragment.actions[dataFragment.actions.length - 1];

        if (!(revertAction.elementId &&
            revertAction.type === lastAction.type &&
            revertAction.elementId === lastAction.elementId &&
            revertAction.context === lastAction.context)) {
          // no need to add
          resultActions = [...dataFragment.actions, revertAction];
        }
      } else {
        resultActions = [...dataFragment.actions, revertAction];
      }

      if (resultActions.length > 700) {
        resultActions = resultActions.slice(-700);
      }

      // action time
      lastActionTime = currentTime;

      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: actionResult.doc,
          actions: resultActions,
          redos: []
        })
      });
    }
    case actionTypes.doActionNoHistory: {
      const actionResult = doAction(doc, action.action);

      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: actionResult.doc,
          redos: []
        })
      });
    }
    case actionTypes.pbUndoAction: {
      if (dataFragment.actions.length > 0) {
        const actions = dataFragment.actions.slice(0);
        const undoActionResult = doAction(doc, actions.pop());
        return updateDataFragment({
          state,
          currentSymbolEditing,
          fragment: Object.assign({}, dataFragment, {
            doc: undoActionResult.doc,
            actions,
            redos: [...dataFragment.redos, undoActionResult.revertAction]
          })
        });
      }
      return state;
    }
    case actionTypes.pbRedoAction:
      if (dataFragment.redos.length > 0) {
        const redos = dataFragment.redos.slice(0);
        const redoActionResult = doAction(doc, redos.pop());
        return updateDataFragment({
          state,
          currentSymbolEditing,
          fragment: Object.assign({}, dataFragment, {
            doc: redoActionResult.doc,
            actions: [...dataFragment.actions, redoActionResult.revertAction],
            redos
          })
        });
      }
      return state;
    case actionTypes.makeElementSymbol: {
      const {elementId, symbol} = action;
      const data = doc[context];

      const elementToSymbol = data[elementId];
      const elementToSymbolParent = data[elementToSymbol.parent];
      const elementToSymbolPosition = elementToSymbolParent.children.indexOf(elementId);

      const result = doAction(doc, [
        {
          type: 'remove',
          elementId,
          context
        },
        {
          type: 'new',
          destination: {
            id: elementToSymbol.parent,
            position: elementToSymbolPosition,
            context
          },
          element: {
            tag: 'Symbol',
            props: {
              symbolId: symbol._id
            }
          }
        }
      ]);
      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: result.doc,
          actions: [...dataFragment.actions, result.revertAction],
          redos: []
        })
      });
    }
    default:
      return state;
  }
};
