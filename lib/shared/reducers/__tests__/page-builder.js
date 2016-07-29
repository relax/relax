import chai from 'chai';
import Relate from 'relate-js';

import draftFixtures from './_fixtures/draft';
import pageBuilderReducer, {defaultState} from '../page-builder';

const draftMock = draftFixtures.mock;
const expect = chai.expect;

describe('Page Builder Reducer', () => {
  it('does not alter state if not a valid action', () => {
    const state = defaultState;
    const newState = pageBuilderReducer(state, {type: 'not-valid'});
    expect(newState).to.equal(state);
  });

  describe('receives and process relate query or mutation for draft', () => {
    it('from draft query', () => {
      const state = defaultState;
      const newState = pageBuilderReducer(state, {
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
      const state = defaultState;
      const newState = pageBuilderReducer(state, {
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
      const state = defaultState;
      const newState = pageBuilderReducer(state, {
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
      const state = defaultState;
      const newState = pageBuilderReducer(state, {
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
});
