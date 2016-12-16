import Relate from 'relate-js';
import actionTypes from 'actions';

export default (state, action, defaultState) => {
  switch (action.type) {
    case Relate.actionTypes.query:
    case Relate.actionTypes.mutation: {
      const data = action.data;
      let draftData;

      if (data.draft) {
        draftData = data.draft;
      } else if (data.restoreRevision) {
        draftData = data.restoreRevision;
      } else if (data.saveDraft && data.saveDraft.draft) {
        draftData = data.saveDraft.draft; // should it?
      } else if (data.dropDraft) {
        draftData = data.dropDraft;
      }

      if (draftData) {
        const dataChange = {};
        const fragment = {};

        if (draftData.doc) {
          fragment.doc = draftData.doc;
        }
        if (draftData.actions) {
          fragment.actions = draftData.actions;
          fragment.redos = [];
        }
        if (draftData._id) {
          dataChange.id = draftData._id;
        }
        if (draftData.itemId) {
          dataChange.itemId = draftData.itemId;
        }
        if (draftData.type) {
          dataChange.type = draftData.type;
        }
        if (draftData.restored || draftData.restored === false) {
          dataChange.restored = draftData.restored;
        }

        let linkTabSchemaId = 'page';
        if (state.id && state.type && state.type !== 'template') {
          if (state.type === 'page') {
            linkTabSchemaId = 'page';
          } else {
            linkTabSchemaId = state.type;
          }
        }

        return Object.assign({},
          state.id !== dataChange.id ? defaultState : state,
          dataChange,
          {
            fragments: Object.assign({}, state.fragments, {
              draft: Object.assign({}, state.fragments.draft, fragment),
              template: state.template
            })
          },
          {
            linkTabSchemaId
          }
        );
      }
      return state;
    }
    case actionTypes.setPageBuilderTemplate:
      return Object.assign({}, state, {
        fragments: Object.assign({}, state.fragments, {
          template: {
            doc: action.template,
            actions: [],
            redos: []
          }
        })
      });
    case actionTypes.pbEditSymbol: {
      const {elementId, symbol} = action;

      return Object.assign({}, state, {
        focused: {
          id: elementId,
          context
        },
        symbolsEditing: [...state.symbolsEditing, {
          id: elementId,
          context,
          symbolId: symbol._id
        }],
        symbolsData: Object.assign({}, state.symbolsData, {
          [symbol._id]: {
            doc: {
              [symbol._id]: symbol.data
            },
            actions: [],
            redos: []
          }
        })
      });
    }
    case actionTypes.pbCloseEditSymbol: {
      const symbolsEditing = state.symbolsEditing.slice(0);
      const removedId = symbolsEditing.pop();
      const nextFocused = symbolsEditing.length && symbolsEditing[symbolsEditing.length - 1];
      const symbolsData = Object.assign({}, state.symbolsData);
      delete symbolsData[removedId];

      return Object.assign({}, state, {
        focused: nextFocused,
        symbolsEditing,
        symbolsData,
        selected: null,
        selectedElement: null,
        selectedParent: null,
        selectedPath: [],
        overed: null
      });
    }
    default:
      return state;
  }
};
