import chai from 'chai';

import action from '../duplicate';

const expect = chai.expect;

describe('PB: duplicate element', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
