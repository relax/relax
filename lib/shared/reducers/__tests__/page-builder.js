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

  describe('processes page builder action PB_DO_ACTION', () => {
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
    });
  });
});
