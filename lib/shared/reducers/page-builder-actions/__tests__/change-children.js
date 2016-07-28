import chai from 'chai';

import action from '../change-children';

const expect = chai.expect;

describe('PB: change element children', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
