import chai from 'chai';

import action from '../make-dynamic';

const expect = chai.expect;

describe('PB: make element dynamic', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
