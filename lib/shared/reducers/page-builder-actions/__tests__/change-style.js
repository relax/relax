import chai from 'chai';

import action from '../change-style';

const expect = chai.expect;

describe('PB: change element style', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
