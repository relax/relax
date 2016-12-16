import actionTypes from 'actions';
import getActiveContextFragment from 'helpers/page-builder/get-active-context-fragment';
import getContextFragment from 'helpers/page-builder/get-context-fragment';
import updateContextFragment from 'helpers/page-builder/update-context-fragment';

import doAction from './page-actions';

let lastActionTime = null;

export default (state, action) => {
  switch (action.type) {
    case actionTypes.pbDoAction: {
      const pageAction = action.action;
      const fragment = getContextFragment(state, pageAction.context);

      const actionResult = doAction(fragment.doc, pageAction);
      const revertAction = actionResult.revertAction;
      const currentTime = Date.now();
      let resultActions = fragment.actions;

      if (fragment.actions.length && lastActionTime && currentTime - lastActionTime < 500) {
        const lastAction = fragment.actions[fragment.actions.length - 1];

        if (!(revertAction.elementId &&
            revertAction.type === lastAction.type &&
            revertAction.elementId === lastAction.elementId &&
            revertAction.context === lastAction.context)) {
          // no need to add
          resultActions = [...fragment.actions, revertAction];
        }
      } else {
        resultActions = [...fragment.actions, revertAction];
      }

      // Cap actions at 700
      if (resultActions.length > 700) {
        resultActions = resultActions.slice(-700);
      }

      // action time
      lastActionTime = currentTime;

      return updateContextFragment(state, pageAction.context, {
        doc: actionResult.doc,
        actions: resultActions,
        redos: []
      });
    }
    case actionTypes.doActionNoHistory: {
      const pageAction = action.action;
      const fragment = getContextFragment(state, pageAction.context);
      const actionResult = doAction(fragment.doc, pageAction);

      return updateContextFragment(state, pageAction.context, {
        doc: actionResult.doc,
        redos: []
      });
    }
    case actionTypes.pbUndoAction: {
      const fragment = getActiveContextFragment(state);

      if (fragment.actions.length > 0) {
        const actions = fragment.actions.slice(0);
        const undoActionResult = doAction(fragment.doc, actions.pop());

        // reverted action needs to have context
        const context = undoActionResult.revertAction.context;

        return updateContextFragment(state, context, {
          doc: undoActionResult.doc,
          actions,
          redos: [...fragment.redos, undoActionResult.revertAction]
        });
      }

      return state;
    }
    case actionTypes.pbRedoAction: {
      const fragment = getActiveContextFragment(state);

      if (fragment.redos.length > 0) {
        const redos = fragment.redos.slice(0);
        const redoActionResult = doAction(fragment.doc, redos.pop());

        // reverted action needs to have context
        const context = redoActionResult.revertAction.context;

        return updateContextFragment(state, context, {
          doc: redoActionResult.doc,
          actions: [...fragment.actions, redoActionResult.revertAction],
          redos
        });
      }

      return state;
    }
    case actionTypes.makeElementSymbol: {
      const {elementId, symbol, context} = action;
      const fragment = getContextFragment(state, context);

      const data = fragment.doc[context.property];

      const elementToSymbol = data[elementId];
      const elementToSymbolParent = data[elementToSymbol.parent];
      const elementToSymbolPosition = elementToSymbolParent.children.indexOf(elementId);

      const result = doAction(fragment.doc, [
        {
          type: 'remove',
          elementId,
          context
        },
        {
          type: 'new',
          destination: {
            id: elementToSymbol.parent,
            position: elementToSymbolPosition
          },
          context,
          element: {
            tag: 'Symbol',
            props: {
              symbolId: symbol._id
            }
          }
        }
      ]);

      return updateContextFragment(state, context, {
        doc: result.doc,
        actions: [...fragment.actions, result.revertAction],
        redos: []
      });
    }
    default:
      return state;
  }
};
