import actionTypes from 'actions';

import actionsReducer from '../actions';
import {cleanupId} from '../page-actions/helpers/get-id';
import {defaultState} from '../index';

describe('Page builder page actions', () => {
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
      const newState = actionsReducer(iniState, {
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
      const newState = actionsReducer(iniState, {
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
      const newState = actionsReducer(iniState, {
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
      const newState = actionsReducer(iniState, {
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
});
