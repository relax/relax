import chai from 'chai';

import action from '../remove';

const expect = chai.expect;

describe('PB: remove element action', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
