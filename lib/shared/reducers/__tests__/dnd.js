import actionTypes from 'actions';
import chai from 'chai';

import dndReducer, {defaultState} from '../dnd';

const expect = chai.expect;

describe('DND Reducer', () => {
  it('should return the initial state', () => {
    expect(dndReducer(defaultState, {})).to.equal(defaultState);
  });

  it('should handle START_DRAGGING', () => {
    const action = {
      type: actionTypes.startDragging,
      draggingData: 'Test',
      dragInfo: 'Test2'
    };

    expect(dndReducer(defaultState, action)).to.be.an('object');
    expect(dndReducer(defaultState, action)).to.have.property('dragging').to.be.true;
    expect(dndReducer(defaultState, action)).to.have.property('draggingData').to.equal('Test');
    expect(dndReducer(defaultState, action)).to.have.property('dragInfo').to.equal('Test2');
  });

  it('should handle ON_DROPPABLE', () => {
    const action = {
      type: actionTypes.onDroppable,
      dropInfo: 'Test2'
    };

    expect(dndReducer(defaultState, action)).to.be.an('object');
    expect(dndReducer(defaultState, action)).to.have.property('dropInfo').to.equal(action.dropInfo);
  });

  it('should handle OUT_DROPPABLE', () => {
    const action = {
      type: actionTypes.outDroppable,
      id: 5
    };

    const theState = defaultState;
    // delete the key dropInfo of theState to assign it a new value
    delete theState.dropInfo;
    theState.dropInfo = {};
    theState.dropInfo.id = 5;

    expect(dndReducer(theState, {})).to.equal(theState);
    expect(dndReducer(theState, action)).to.have.property('dropInfo').to.be.false;
  });

  it('should handle STOP_DRAGGING', () => {
    expect(dndReducer(defaultState, {})).to.equal(defaultState);
  });
});
