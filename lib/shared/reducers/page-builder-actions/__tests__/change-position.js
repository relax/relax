import chai from 'chai';

import action from '../change-position';

const expect = chai.expect;

describe('PB: change element position', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
