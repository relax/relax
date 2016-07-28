import chai from 'chai';

import action from '../new';

const expect = chai.expect;

describe('PB: new element action', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
