import actionTypes from 'actions';

import selectionReducer from '../selection';
import {defaultState} from '../index';

describe('Page builder selection actions', () => {
  describe('handles PB_SELECT_ELEMENT', () => {
    it('selects an existing and valid element', () => {
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          draft: {
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
          }
        },
        expanded: {
          draft: {
            data: {
              1: false
            }
          }
        }
      });
      const newState = selectionReducer(iniState, {
        type: actionTypes.pbSelectElement,
        elementId: '1',
        context: {
          doc: 'draft',
          property: 'data'
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);

      expect(newState.selected).toEqual({
        id: '1',
        context: {
          doc: 'draft',
          property: 'data'
        }
      });
      expect(newState.expanded).toEqual({
        draft: {
          data: {
            0: true,
            1: false
          }
        }
      });
    });

    it('puts selected to null if invalid or null input', () => {
      const iniState = Object.assign({}, defaultState, {
        selected: {
          id: '2'
        }
      });
      const newState = selectionReducer(iniState, {
        type: actionTypes.pbSelectElement,
        elementId: null
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.selected).toBeNull();
    });
  });

  it('handles PB_OVER_ELEMENT', () => {
    const iniState = Object.assign({}, defaultState, {
      fragments: {
        draft: {
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
        }
      }
    });
    const newState = selectionReducer(iniState, {
      type: actionTypes.pbOverElement,
      elementId: '0',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.overed).toEqual({
      id: '0',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });
  });

  describe('handles PB_OUT_ELEMENT', () => {
    it('does not do anything if current overed element is different', () => {
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          draft: {
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
          }
        },
        overed: {
          id: 'some',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = selectionReducer(iniState, {
        type: actionTypes.pbOutElement,
        elementId: '0',
        context: {
          doc: 'draft',
          property: 'data'
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).toBe(iniState);
      expect(newState).toEqual(iniState);
    });

    it('sets to null if same overed element', () => {
      const iniState = Object.assign({}, defaultState, {
        fragments: {
          draft: {
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
          }
        },
        overed: {
          id: '0',
          context: {
            doc: 'draft',
            property: 'data'
          }
        }
      });
      const newState = selectionReducer(iniState, {
        type: actionTypes.pbOutElement,
        elementId: '0',
        context: {
          doc: 'draft',
          property: 'data'
        }
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);
      expect(newState.overed).toBeNull();
    });
  });
});
