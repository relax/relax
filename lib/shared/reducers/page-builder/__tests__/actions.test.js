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
        fragments: {
          draft: {
            actions: [],
            redos: [],
            doc: {
              data: {}
            }
          }
        }
      });
      const newState = actionsReducer(iniState, {
        type: actionTypes.pbDoAction,
        action: {
          type: 'new',
          destination: {
            id: 'Body',
            position: 0
          },
          context: {
            doc: 'draft',
            property: 'data'
          },
          element: {
            type: 'TextBox'
          }
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments.draft).not.toBe(iniState.fragments.draft);
      expect(newState.fragments.draft.doc).not.toBe(iniState.fragments.draft.doc);

      expect(newState.fragments.draft.doc).toEqual({
        data: {
          Body: {
            id: 'Body',
            tag: 'Body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'Body',
            type: 'TextBox'
          }
        }
      });
      expect(newState.fragments.draft.actions).toEqual([{
        type: 'remove',
        elementId: '0',
        context: {
          doc: 'draft',
          property: 'data'
        }
      }]);
      expect(newState.fragments.draft.redos).toEqual([]);
    });
  });

  describe('handles PB_UNDO_ACTION', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes undo action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          draft: {
            actions: [{
              type: 'remove',
              elementId: '0',
              context: {
                doc: 'draft',
                property: 'data'
              }
            }],
            redos: [],
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
            }
          }
        }
      });
      const newState = actionsReducer(iniState, {
        type: actionTypes.pbUndoAction
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments.draft).not.toBe(iniState.fragments.draft);
      expect(newState.fragments.draft.doc).not.toBe(iniState.fragments.draft.doc);

      expect(newState.fragments.draft.doc).toEqual({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: []
          }
        }
      });
      expect(newState.fragments.draft.actions).toEqual([]);
      expect(newState.fragments.draft.redos).toEqual([{
        type: 'add',
        destination: {
          id: 'body',
          position: 0
        },
        context: {
          doc: 'draft',
          property: 'data'
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
        fragments: {
          draft: {
            actions: [],
            redos: [{
              type: 'add',
              destination: {
                id: 'body',
                position: 0
              },
              context: {
                doc: 'draft',
                property: 'data'
              },
              element: {
                id: '0',
                parent: 'body',
                type: 'TextBox'
              },
              childrenElements: null
            }],
            doc: {
              data: {
                body: {
                  id: 'body',
                  tag: 'body',
                  children: []
                }
              }
            }
          }
        }
      });
      const newState = actionsReducer(iniState, {
        type: actionTypes.pbRedoAction
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments.draft).not.toBe(iniState.fragments.draft);
      expect(newState.fragments.draft.doc).not.toBe(iniState.fragments.draft.doc);

      expect(newState.fragments.draft.doc).toEqual({
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
      expect(newState.fragments.draft.actions).toEqual([{
        type: 'remove',
        elementId: '0',
        context: {
          doc: 'draft',
          property: 'data'
        }
      }]);
      expect(newState.fragments.draft.redos).toEqual([]);
    });
  });

  describe('handles MAKE_ELEMENT_SYMBOL', () => {
    afterEach(() => {
      cleanupId();
    });

    it('processes action with context to draft doc', () => {
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          draft: {
            actions: [],
            redos: [],
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
          }
        }
      });
      const newState = actionsReducer(iniState, {
        type: actionTypes.makeElementSymbol,
        elementId: '0',
        context: {
          doc: 'draft',
          property: 'data'
        },
        symbol: {
          _id: 'symbolID'
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.fragments).not.toBe(iniState.fragments);
      expect(newState.fragments.draft).not.toBe(iniState.fragments.draft);
      expect(newState.fragments.draft.doc).not.toBe(iniState.fragments.draft.doc);

      expect(newState.fragments.draft.doc).toEqual({
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
      expect(newState.fragments.draft.actions).toEqual([[
        {
          type: 'remove',
          elementId: '0',
          context: {
            doc: 'draft',
            property: 'data'
          }
        },
        {
          type: 'add',
          destination: {
            id: 'body',
            position: 0
          },
          context: {
            doc: 'draft',
            property: 'data'
          },
          element: {
            id: '0',
            parent: 'body',
            tag: 'TextBox'
          },
          childrenElements: null
        }
      ]]);
      expect(newState.fragments.draft.redos).toEqual([]);
    });
  });
});
