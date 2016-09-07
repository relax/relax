import actionTypes from 'actions';
import chai from 'chai';
import Relate from 'relate-js';

import draftFixtures from './_fixtures/draft';
import pageBuilderReducer, {defaultState} from '../page-builder';
import {cleanupId} from '../page-builder-actions/helpers/get-id';

const draftMock = draftFixtures.mock;
const expect = chai.expect;

describe('Page Builder Reducer', () => {
  it('does not alter state if not a valid action', () => {
    const state = defaultState;
    const newState = pageBuilderReducer(defaultState, {type: 'not-valid'});
    expect(newState).to.equal(state);
  });

  describe('receives and process relate query or mutation for draft', () => {
    it('from draft query', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.query,
        data: {
          draft: draftMock
        }
      });

      expect(newState).to.be.an('object');

      expect(newState).to.have.property('doc');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('id');
      expect(newState).to.have.property('itemId');
      expect(newState).to.have.property('type');

      expect(newState.doc).to.deep.equals(draftMock.doc);
      expect(newState.actions).to.deep.equals(draftMock.actions);
      expect(newState.id).to.deep.equals(draftMock._id);
      expect(newState.itemId).to.deep.equals(draftMock.itemId);
      expect(newState.type).to.deep.equals(draftMock.type);
    });

    it('from restoreRevision mutation', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          restoreRevision: {
            draft: draftMock
          }
        }
      });

      expect(newState).to.be.an('object');

      expect(newState).to.have.property('doc');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('id');
      expect(newState).to.have.property('itemId');
      expect(newState).to.have.property('type');

      expect(newState.doc).to.deep.equals(draftMock.doc);
      expect(newState.actions).to.deep.equals(draftMock.actions);
      expect(newState.id).to.deep.equals(draftMock._id);
      expect(newState.itemId).to.deep.equals(draftMock.itemId);
      expect(newState.type).to.deep.equals(draftMock.type);
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

      expect(newState).to.be.an('object');

      expect(newState).to.have.property('doc');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('id');
      expect(newState).to.have.property('itemId');
      expect(newState).to.have.property('type');

      expect(newState.doc).to.deep.equals(draftMock.doc);
      expect(newState.actions).to.deep.equals(draftMock.actions);
      expect(newState.id).to.deep.equals(draftMock._id);
      expect(newState.itemId).to.deep.equals(draftMock.itemId);
      expect(newState.type).to.deep.equals(draftMock.type);
    });

    it('from dropDraft mutation', () => {
      const newState = pageBuilderReducer(defaultState, {
        type: Relate.actionTypes.mutation,
        data: {
          dropDraft: draftMock
        }
      });

      expect(newState).to.be.an('object');

      expect(newState).to.have.property('doc');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('id');
      expect(newState).to.have.property('itemId');
      expect(newState).to.have.property('type');

      expect(newState.doc).to.deep.equals(draftMock.doc);
      expect(newState.actions).to.deep.equals(draftMock.actions);
      expect(newState.id).to.deep.equals(draftMock._id);
      expect(newState.itemId).to.deep.equals(draftMock.itemId);
      expect(newState.type).to.deep.equals(draftMock.type);
    });
  });

  it('should handle PB_CHANGE_STATE', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbChangeState,
      state: 'saving',
      message: 'Saving draft'
    });

    expect(newState).to.be.an('object');

    expect(newState).to.have.property('state').to.equal('saving');
    expect(newState).to.have.property('stateMessage').to.equal('Saving draft');
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

      expect(newState).to.be.an('object');
      expect(newState)
        .to.have.property('doc')
        .to.have.property('data');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('redos');

      expect(newState.doc).to.deep.equals({
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
      expect(newState.actions).to.deep.equals([
        {
          type: 'remove',
          elementId: '0',
          context: 'data'
        }
      ]);
      expect(newState.redos).to.deep.equals([]);
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

      expect(newState).to.be.an('object');
      expect(newState)
        .to.have.property('doc')
        .to.have.property('data');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('redos');

      expect(newState.doc).to.deep.equals({
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: []
          }
        }
      });
      expect(newState.actions).to.deep.equals([]);
      expect(newState.redos).to.deep.equals([{
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

      expect(newState).to.be.an('object');
      expect(newState)
        .to.have.property('doc')
        .to.have.property('data');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('redos');

      expect(newState.doc).to.deep.equals({
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
      expect(newState.actions).to.deep.equals([{
        type: 'remove',
        elementId: '0',
        context: 'data'
      }]);
      expect(newState.redos).to.deep.equals([]);
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

      expect(newState).to.be.an('object');
      expect(newState)
        .to.have.property('doc')
        .to.have.property('data');
      expect(newState).to.have.property('actions');
      expect(newState).to.have.property('redos');

      expect(newState.doc).to.deep.equals({
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
      expect(newState.actions).to.deep.equals([[
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
      expect(newState.redos).to.deep.equals([]);
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

    expect(newState).to.be.an('object');
    expect(newState).to.have.property('selected');
    expect(newState)
      .to.have.property('expanded')
      .to.have.property('data');

    expect(newState.selected).to.deep.equals({
      id: '1',
      context: 'data'
    });
    expect(newState.expanded).to.deep.equals({
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('expanded')
      .to.have.property('data');
    expect(newState)
      .to.have.property('userExpanded')
      .to.have.property('data');

    expect(newState.expanded).to.deep.equals({
      data: {
        1: true
      }
    });
    expect(newState.userExpanded).to.deep.equals({
      data: {
        1: true
      }
    });

    const newState1 = pageBuilderReducer(newState, {
      type: actionTypes.pbToggleExpandElement,
      elementId: '1',
      context: 'data'
    });

    expect(newState1.expanded).to.deep.equals({
      data: {
        1: false
      }
    });
    expect(newState1.userExpanded).to.deep.equals({
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

    expect(newState).to.be.an('object');
    expect(newState).to.have.property('userExpanded');

    expect(newState.userExpanded).to.deep.equals({
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

    expect(newState).to.be.an('object');
    expect(newState).to.have.property('expanded');
    expect(newState).to.have.property('userExpanded');

    expect(newState.expanded).to.deep.equals({});
    expect(newState.userExpanded).to.deep.equals({});
  });

  it('handles PB_TOGGLE_EDITING', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbToggleEditing
    });

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('editing')
      .to.equal(false);
  });

  it('handles PB_SET_MENU_TAB', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbSetMenuTab,
      value: 'someTab'
    });

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('menuTab')
      .to.equal('someTab');
  });

  it('handles PB_OPEN_ELEMENTS_MENU', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbOpenElementsMenu,
      options: {
        someOption: 1
      }
    });

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('elementsMenuOpened')
      .to.equal(true);
    expect(newState)
      .to.have.property('elementsMenuOptions')
      .to.deep.equals({
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('elementsMenuOpened')
      .to.equal(false);
    expect(newState)
      .to.have.property('elementsMenuOptions')
      .to.equal(null);
    expect(newState)
      .to.have.property('elementsMenuSpot')
      .to.equal(null);
  });

  it('handles PB_TOGGLE_CATEGORY', () => {
    const newState = pageBuilderReducer(defaultState, {
      type: actionTypes.pbToggleCategory,
      category: 'some'
    });

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('categoriesCollapsed')
      .to.have.property('some')
      .to.equal(true);
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('overed')
      .to.deep.equals({
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

      expect(newState).to.be.an('object');
      expect(newState).to.be.equal(iniState);
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

      expect(newState).to.be.an('object');
      expect(newState)
        .to.have.property('overed')
        .to.equal(null);
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('linkingData')
      .to.deep.equals({
        id: '0',
        context: 'data'
      });
    expect(newState)
      .to.have.property('focused')
      .to.deep.equals({
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('linkingData')
      .to.equal(null);
    expect(newState)
      .to.have.property('linkingDataElement')
      .to.equal(null);
    expect(newState)
      .to.have.property('focused')
      .to.equal(null);
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

    expect(newState).to.be.an('object');
    expect(newState)
      .to.have.property('linkTabSchemaId')
      .to.equal('123');
  });
});
