import chai from 'chai';

import action from '../set-content-element';

const expect = chai.expect;

describe('PB: set element content action', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
