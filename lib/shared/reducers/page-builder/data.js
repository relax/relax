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

        if (draftData.doc) {
          dataChange.doc = draftData.doc;
        }
        if (draftData.actions) {
          dataChange.actions = draftData.actions;
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
            template: state.template,
            linkTabSchemaId
          }
        );
      }
      return state;
    }
    case actionTypes.setPageBuilderTemplate:
      return Object.assign({}, state, {
        template: action.template
      });
    default:
      return state;
  }
};
