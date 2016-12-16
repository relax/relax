import Relate from 'relate-js';
import actionTypes from 'actions';

import draftFixtures from './_fixtures/draft';
import fragmentsReducer from '../fragments';
import {defaultState} from '../index';

const draftMock = draftFixtures.mock;

describe('Page builder fragments actions', () => {
  describe('relate queries or mutations with a draft', () => {
    it('does nothing if no data in relate query', () => {
      const newState = fragmentsReducer(defaultState, {
        type: Relate.actionTypes.query
      });

      expect(newState).toBe(defaultState);
    });

    it('from draft query', () => {
      const newState = fragmentsReducer(defaultState, {
        type: Relate.actionTypes.query,
        data: {
          draft: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.fragments.draft.doc).toEqual(draftMock.doc);
      expect(newState.fragments.draft.actions).toEqual(draftMock.actions);
      expect(newState.fragments.draft.redos).toEqual([]);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from restoreRevision mutation', () => {
      const newState = fragmentsReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          restoreRevision: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.fragments.draft.doc).toEqual(draftMock.doc);
      expect(newState.fragments.draft.actions).toEqual(draftMock.actions);
      expect(newState.fragments.draft.redos).toEqual([]);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from saveDraft mutation', () => {
      const newState = fragmentsReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          saveDraft: {
            draft: draftMock
          }
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.fragments.draft.doc).toEqual(draftMock.doc);
      expect(newState.fragments.draft.actions).toEqual(draftMock.actions);
      expect(newState.fragments.draft.redos).toEqual([]);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from dropDraft mutation', () => {
      const newState = fragmentsReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          dropDraft: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.fragments.draft.doc).toEqual(draftMock.doc);
      expect(newState.fragments.draft.actions).toEqual(draftMock.actions);
      expect(newState.fragments.draft.redos).toEqual([]);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('link tab schema id default', () => {
      const iniState = Object.assign({}, defaultState, {
        id: '123',
        type: 'page'
      });
      const newState = fragmentsReducer(iniState, {
        type: Relate.actionTypes.query,
        data: {
          draft: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.linkTabSchemaId).toBe('page');
    });
  });

  it('handles PB_SET_TEMPLATE', () => {
    const newState = fragmentsReducer(defaultState, {
      type: actionTypes.setPageBuilderTemplate,
      template: {
        id: 'template'
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState).not.toBe(defaultState);

    expect(newState.fragments.template.doc).toEqual({
      id: 'template'
    });
    expect(newState.fragments.template.actions).toEqual([]);
    expect(newState.fragments.template.redos).toEqual([]);
  });

  it('handles PB_EDIT_SYMBOL', () => {
    const context = {
      doc: 'draft',
      property: 'data'
    };
    const newState = fragmentsReducer(defaultState, {
      type: actionTypes.pbEditSymbol,
      elementId: '0',
      context,
      symbol: {
        _id: 'symbol'
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState).not.toBe(defaultState);

    expect(newState.focused).toEqual({
      id: '0',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });
    expect(newState.symbolsEditing).toHaveLength(1);
    expect(newState.symbolsEditing[0]).toEqual({
      id: '0',
      context,
      symbolId: 'symbol'
    });

    expect(newState.fragments.symbol).toBeInstanceOf(Object);
    expect(newState.fragments.symbol.actions).toHaveLength(0);
    expect(newState.fragments.symbol.redos).toHaveLength(0);
    expect(newState.fragments.symbol.doc).toEqual({
      _id: 'symbol'
    });
  });

  describe('handles PB_CLOSE_EDIT_SYMBOL', () => {
    it('closes last symbols editing', () => {
      const context = {
        doc: 'draft',
        property: 'data'
      };
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          symbol: {}
        },
        focused: {
          id: '0',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        symbolsEditing: [{
          id: '0',
          context,
          symbolId: 'symbol'
        }],
        selected: {},
        selectedElement: {},
        selectedParent: {},
        selectedPath: [{}],
        overed: {}
      });

      const newState = fragmentsReducer(iniState, {
        type: actionTypes.pbCloseEditSymbol
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);

      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments).toEqual({});

      expect(newState.focused).toBeNull();
      expect(newState.selected).toBeNull();
      expect(newState.selectedElement).toBeNull();
      expect(newState.selectedParent).toBeNull();
      expect(newState.selectedPath).toEqual([]);
      expect(newState.overed).toBeNull();

      expect(newState.symbolsEditing).not.toBe(iniState.symbolsEditing);
      expect(newState.symbolsEditing).toEqual([]);
    });

    it('sets focused to previous symbols editing when more than one', () => {
      const context = {
        doc: 'draft',
        property: 'data'
      };
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          symbol: {},
          symbol123: {}
        },
        focused: {
          id: '0',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        symbolsEditing: [
          {
            id: '2',
            context,
            symbolId: 'symbol123'
          },
          {
            id: '0',
            context,
            symbolId: 'symbol'
          }
        ],
        selected: {},
        selectedElement: {},
        selectedParent: {},
        selectedPath: [{}],
        overed: {}
      });

      const newState = fragmentsReducer(iniState, {
        type: actionTypes.pbCloseEditSymbol
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);

      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments).toEqual({
        symbol123: {}
      });

      expect(newState.focused).toEqual({
        id: '2',
        context
      });
      expect(newState.selected).toBeNull();
      expect(newState.selectedElement).toBeNull();
      expect(newState.selectedParent).toBeNull();
      expect(newState.selectedPath).toEqual([]);
      expect(newState.overed).toBeNull();

      expect(newState.symbolsEditing).not.toBe(iniState.symbolsEditing);
      expect(newState.symbolsEditing).toEqual([{
        id: '2',
        context,
        symbolId: 'symbol123'
      }]);
    });
  });
});
