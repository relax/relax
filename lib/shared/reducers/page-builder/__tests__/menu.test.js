import actionTypes from 'actions';

import menuReducer from '../menu';
import {defaultState} from '../index';

describe('Page builder menu actions', () => {
  describe('handles PB_SET_MENU_TAB', () => {
    it('handles normal tab change', () => {
      const newState = menuReducer(defaultState, {
        type: actionTypes.pbSetMenuTab,
        value: 'someTab'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState.menuTab).toBe('someTab');
    });

    it('handles change to link tab with no element selected', () => {
      const newState = menuReducer(defaultState, {
        type: actionTypes.pbSetMenuTab,
        value: 'link'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState.menuTab).toBe('link');
      expect(newState.linkingData).toBeNull();
      expect(newState.focused).toBeNull();
    });

    it('handles change to link tab with element selected', () => {
      const iniState = Object.assign({}, defaultState, {
        selected: {
          id: '1'
        },
        selectedElement: {
          id: '1',
          parent: '0',
          tag: 'DynamicList'
        }
      });
      const newState = menuReducer(iniState, {
        type: actionTypes.pbSetMenuTab,
        value: 'link'
      });

      expect(newState).toBeInstanceOf(Object);
      expect(newState).not.toBe(iniState);

      expect(newState.menuTab).toBe('link');
      expect(newState.linkingData).toEqual({
        id: '1'
      });
      expect(newState.focused).toEqual({
        id: '1'
      });

      const newerState = menuReducer(newState, {
        type: actionTypes.pbSetMenuTab,
        value: 'styles'
      });

      expect(newerState).toBeInstanceOf(Object);
      expect(newerState).not.toBe(newState);

      expect(newState.menuTab).toBe('styles');
      expect(newState.selected).toEqual({
        id: '1'
      });
      expect(newState.linkingData).toBeNull();
      expect(newState.focused).toBeNull();
    });
  });

  it('handles PB_TOGGLE_EXPAND_ELEMENT', () => {
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
      }
    });
    const newState = menuReducer(iniState, {
      type: actionTypes.pbToggleExpandElement,
      elementId: '1',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState).not.toBe(iniState);

    expect(newState.expanded).toEqual({
      draft: {
        data: {
          1: true
        }
      }
    });
    expect(newState.userExpanded).toEqual({
      draft: {
        data: {
          1: true
        }
      }
    });

    const newState1 = menuReducer(newState, {
      type: actionTypes.pbToggleExpandElement,
      elementId: '1',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });

    expect(newState1.expanded).toEqual({
      draft: {
        data: {
          1: false
        }
      }
    });
    expect(newState1.userExpanded).toEqual({
      draft: {
        data: {
          1: false
        }
      }
    });
  });

  it('handles PB_EXPAND_ALL', () => {
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
            },
            anotherData: {
              body: {
                id: 'body',
                tag: 'body',
                children: ['0']
              },
              0: {
                id: '0',
                tag: 'TextBox'
              }
            },
            someObj: {
              user: '123'
            },
            title: 'Just a title'
          }
        }
      }
    });
    const newState = menuReducer(iniState, {
      type: actionTypes.pbExpandAll
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState).not.toBe(iniState);
    expect(newState.userExpanded).not.toBe(iniState.userExpanded);

    expect(newState.userExpanded).toEqual({
      draft: {
        data: {
          body: true,
          0: true,
          1: true
        },
        anotherData: {
          body: true,
          0: true
        }
      }
    });
  });

  it('handles PB_COLLAPSE_ALL', () => {
    const iniState = Object.assign({}, defaultState, {
      expanded: {remove: true},
      userExpanded: {remove: true}
    });
    const newState = menuReducer(iniState, {
      type: actionTypes.pbCollapseAll
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState).not.toBe(iniState);

    expect(newState.expanded).toEqual({});
    expect(newState.userExpanded).toEqual({});
  });

  it('handles PB_CHANGES_LINK_TAB_SCHEMA_ID', () => {
    const newState = menuReducer(defaultState, {
      type: actionTypes.pbChangeLinkTabSchemaId,
      schemaId: '123'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.linkTabSchemaId).toBe('123');
  });
});
