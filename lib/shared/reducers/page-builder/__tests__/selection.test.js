import actionTypes from 'actions';

import selectionReducer from '../selection';
import {defaultState} from '../index';

describe('Page builder selection actions', () => {
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
    const newState = selectionReducer(iniState, {
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
    const newState = selectionReducer(iniState, {
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
      const newState = selectionReducer(iniState, {
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
      const newState = selectionReducer(iniState, {
        type: actionTypes.pbOutElement,
        elementId: '0',
        context: 'data'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState.overed).toBe(null);
    });
  });
});
