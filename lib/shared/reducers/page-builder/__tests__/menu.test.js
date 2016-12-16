import actionTypes from 'actions';

import menuReducer from '../menu';
import {defaultState} from '../index';

describe('Page builder menu actions', () => {
  it('handles PB_SET_MENU_TAB', () => {
    const newState = menuReducer(defaultState, {
      type: actionTypes.pbSetMenuTab,
      value: 'someTab'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.menuTab).toBe('someTab');
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
    const newState = menuReducer(iniState, {
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

    const newState1 = menuReducer(newState, {
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
    const newState = menuReducer(iniState, {
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
    const newState = menuReducer(iniState, {
      type: actionTypes.pbCollapseAll
    });

    expect(newState).toBeInstanceOf(Object);

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
