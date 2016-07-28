import chai from 'chai';

import action from '../move';

const expect = chai.expect;

describe('PB: move element action', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
