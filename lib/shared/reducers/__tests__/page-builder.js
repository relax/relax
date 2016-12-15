import actionTypes from 'actions';

import Relate from 'relate-js';

import draftFixtures from './_fixtures/draft';
import pageBuilderReducer, {defaultState} from '../page-builder';
import {cleanupId} from '../page-builder-actions/helpers/get-id';

const draftMock = draftFixtures.mock;


describe('Page Builder Reducer', () => {
  it('does not alter state if not a valid action', () => {
    const state = defaultState;
    const newState = pageBuilderReducer(defaultState, {type: 'not-valid'});
    expect(newState).toBe(state);
  });

  describe('receives and process relate query or mutation for draft', () => {
    it('from draft query', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.query,
        data: {
          draft: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual(draftMock.doc);
      expect(newState.actions).toEqual(draftMock.actions);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from restoreRevision mutation', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          restoreRevision: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual(draftMock.doc);
      expect(newState.actions).toEqual(draftMock.actions);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from saveDraft mutation', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          saveDraft: {
            draft: draftMock
          }
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual(draftMock.doc);
      expect(newState.actions).toEqual(draftMock.actions);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });

    it('from dropDraft mutation', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          dropDraft: draftMock
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual(draftMock.doc);
      expect(newState.actions).toEqual(draftMock.actions);
      expect(newState.id).toEqual(draftMock._id);
      expect(newState.itemId).toEqual(draftMock.itemId);
      expect(newState.type).toEqual(draftMock.type);
    });
  });

  it('should handle PB_CHANGE_STATE', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbChangeState,
      state: 'saving',
      message: 'Saving draft'
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.state).toBe('saving');
    expect(newState.stateMessage).toBe('Saving draft');
  });

  describe('handles PB_DO_ACTION', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {}
        }
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.pbDoAction,
        action: {
          type: 'new',
          destination: {
            id: 'body',
            context: 'data',
            position: 0
          },
          element: {
            type: 'TextBox'
          }
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            type: 'TextBox'
          }
        }
      });
      expect(newState.actions).toEqual([
        {
          type: 'remove',
          elementId: '0',
          context: 'data'
        }
      ]);
      expect(newState.redos).toEqual([]);
    });
  });

  describe('handles PB_UNDO_ACTION', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes undo action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {
            body: {
              id: 'body',
              tag: 'body',
              children: ['0']
            },
            0: {
              id: '0',
              parent: 'body',
              type: 'TextBox'
            }
          }
        },
        actions: [{
          type: 'remove',
          elementId: '0',
          context: 'data'
        }]
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.pbUndoAction
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: []
          }
        }
      });
      expect(newState.actions).toEqual([]);
      expect(newState.redos).toEqual([{
        type: 'add',
        destination: {
          id: 'body',
          context: 'data',
          position: 0
        },
        element: {
          id: '0',
          parent: 'body',
          type: 'TextBox'
        },
        childrenElements: null
      }]);
    });
  });

  describe('handles PB_REDO_ACTION', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes redo action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {
            body: {
              id: 'body',
              tag: 'body',
              children: []
            }
          }
        },
        redos: [{
          type: 'add',
          destination: {
            id: 'body',
            context: 'data',
            position: 0
          },
          element: {
            id: '0',
            parent: 'body',
            type: 'TextBox'
          },
          childrenElements: null
        }]
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.pbRedoAction
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            type: 'TextBox'
          }
        }
      });
      expect(newState.actions).toEqual([{
        type: 'remove',
        elementId: '0',
        context: 'data'
      }]);
      expect(newState.redos).toEqual([]);
    });
  });

  describe('handles MAKE_ELEMENT_SYMBOL', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {
            body: {
              id: 'body',
              tag: 'body',
              children: ['0']
            },
            0: {
              id: '0',
              parent: 'body',
              tag: 'TextBox'
            }
          }
        }
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.makeElementSymbol,
        elementId: '0',
        context: 'data',
        symbol: {
          _id: 'symbolID'
        }
      });

      expect(newState).toBeInstanceOf(Object);

      expect(newState.doc).toEqual({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Symbol',
            props: {
              symbolId: 'symbolID'
            }
          }
        }
      });
      expect(newState.actions).toEqual([[
        {
          type: 'remove',
          elementId: '0',
          context: 'data'
        },
        {
          type: 'add',
          destination: {
            id: 'body',
            position: 0,
            context: 'data'
          },
          element: {
            id: '0',
            parent: 'body',
            tag: 'TextBox'
          },
          childrenElements: null
        }
      ]]);
      expect(newState.redos).toEqual([]);
    });
  });

  it('handles PB_SELECT_ELEMENT', () => {
    const iniState = Object.assign({}, defaultState, {
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section',
            children: ['1']
          },
          1: {
            id: '1',
            parent: '0',
            tag: 'TextBox'
          }
        }
      }
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbSelectElement,
      elementId: '1',
      context: 'data'
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.selected).toEqual({
      id: '1',
      context: 'data'
    });
    expect(newState.expanded).toEqual({
      data: {
        0: true
      }
    });
  });

  it('handles PB_TOGGLE_EXPAND_ELEMENT', () => {
    const iniState = Object.assign({}, defaultState, {
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section',
            children: ['1']
          },
          1: {
            id: '1',
            parent: '0',
            tag: 'TextBox'
          }
        }
      }
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbToggleExpandElement,
      elementId: '1',
      context: 'data'
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.expanded).toEqual({
      data: {
        1: true
      }
    });
    expect(newState.userExpanded).toEqual({
      data: {
        1: true
      }
    });

    const newState1 = pageBuilderReducer(newState, {
      type: actionTypes.pbToggleExpandElement,
      elementId: '1',
      context: 'data'
    });

    expect(newState1.expanded).toEqual({
      data: {
        1: false
      }
    });
    expect(newState1.userExpanded).toEqual({
      data: {
        1: false
      }
    });
  });

  it('handles PB_EXPAND_ALL', () => {
    const iniState = Object.assign({}, defaultState, {
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section',
            children: ['1']
          },
          1: {
            id: '1',
            parent: '0',
            tag: 'TextBox'
          }
        },
        anotherData: {
          0: {
            id: '0',
            tag: 'TextBox'
          }
        }
      }
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbExpandAll
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.userExpanded).toEqual({
      data: {
        body: true,
        0: true,
        1: true
      },
      anotherData: {
        0: true
      }
    });
  });

  it('handles PB_COLLAPSE_ALL', () => {
    const iniState = Object.assign({}, defaultState, {
      expanded: {remove: true},
      userExpanded: {remove: true}
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbCollapseAll
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.expanded).toEqual({});
    expect(newState.userExpanded).toEqual({});
  });

  it('handles PB_TOGGLE_EDITING', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbToggleEditing
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.editing).toBe(false);
  });

  it('handles PB_SET_MENU_TAB', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbSetMenuTab,
      value: 'someTab'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.menuTab).toBe('someTab');
  });

  it('handles PB_OPEN_ELEMENTS_MENU', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbOpenElementsMenu,
      options: {
        someOption: 1
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.elementsMenuOpened).toBe(true);
    expect(newState.elementsMenuOptions).toEqual({
      someOption: 1
    });
  });

  it('handles PB_CLOSE_ELEMENTS_MENU', () => {
    const iniState = Object.assign({}, defaultState, {
      elementsMenuOpened: true,
      elementsMenuOptions: {},
      elementsMenuSpot: 0
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbCloseElementsMenu
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.elementsMenuOpened).toBe(false);
    expect(newState.elementsMenuOptions).toBe(null);
    expect(newState.elementsMenuSpot).toBe(null);
  });

  it('handles PB_TOGGLE_CATEGORY', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbToggleCategory,
      category: 'some'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.categoriesCollapsed.some).toBe(true);
  });

  it('handles PB_OVER_ELEMENT', () => {
    const iniState = Object.assign({}, defaultState, {
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section'
          }
        }
      }
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbOverElement,
      elementId: '0',
      context: 'data'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.overed).toEqual({
      id: '0',
      context: 'data'
    });
  });

  describe('handles PB_OUT_ELEMENT', () => {
    it('does not do anything if current overed element is different', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {
            body: {
              id: 'body',
              tag: 'body',
              children: ['0']
            },
            0: {
              id: '0',
              parent: 'body',
              tag: 'Section'
            }
          }
        },
        overed: {
          id: 'some',
          context: 'data'
        }
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.pbOutElement,
        elementId: '0',
        context: 'data'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).toEqual(iniState);
    });

    it('sets to null if same overed element', () => {
      const iniState = Object.assign({}, defaultState, {
        doc: {
          data: {
            body: {
              id: 'body',
              tag: 'body',
              children: ['0']
            },
            0: {
              id: '0',
              parent: 'body',
              tag: 'Section'
            }
          }
        },
        overed: {
          id: '0',
          context: 'data'
        }
      });
      const newState = pageBuilderReducer(iniState, {
        type: actionTypes.pbOutElement,
        elementId: '0',
        context: 'data'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState.overed).toBe(null);
    });
  });

  it('handles PB_LINK_DATA_MODE', () => {
    const iniState = Object.assign({}, defaultState, {
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section'
          }
        }
      }
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbLinkDataMode,
      elementId: '0',
      context: 'data'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.linkingData).toEqual({
      id: '0',
      context: 'data'
    });
    expect(newState.focused).toEqual({
      id: '0',
      context: 'data'
    });
  });

  it('handles PB_CLOSE_LINK_DATA_MODE', () => {
    const iniState = Object.assign({}, defaultState, {
      linkingData: {},
      linkingDataElement: {},
      focused: {}
    });
    const newState = pageBuilderReducer(iniState, {
      type: actionTypes.pbCloseLinkDataMode
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.linkingData).toBe(null);
    expect(newState.linkingDataElement).toBe(null);
    expect(newState.focused).toBe(null);
  });

  it('handles PB_EDIT_SYMBOL', () => {
    // TODO
  });

  it('handles PB_CLOSE_EDIT_SYMBOL', () => {
    // TODO
  });

  it('handles PB_CHANGES_LINK_TAB_SCHEMA_ID', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbChangeLinkTabSchemaId,
      schemaId: '123'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.linkTabSchemaId).toBe('123');
  });
});
