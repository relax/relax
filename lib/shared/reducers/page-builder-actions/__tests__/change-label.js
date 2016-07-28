import chai from 'chai';

import action from '../change-label';

const expect = chai.expect;

describe('PB: change element label', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
