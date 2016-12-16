import Relate from 'relate-js';

import draftFixtures from './_fixtures/draft';
import fragmentsReducer from '../fragments';
import {defaultState} from '../index';

const draftMock = draftFixtures.mock;

describe('Page builder fragments actions', () => {
  it('from draft query', () => {
    const newState = fragmentsReducer(defaultState, {
      type: Relate.actionTypes.query,
      fragments: {
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
    const newState = fragmentsReducer(defaultState, {
      type: Relate.actionTypes.mutation,
      fragments: {
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
    const newState = fragmentsReducer(defaultState, {
      type: Relate.actionTypes.mutation,
      fragments: {
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
    const newState = fragmentsReducer(defaultState, {
      type: Relate.actionTypes.mutation,
      fragments: {
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
