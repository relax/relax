import chai from 'chai';

import action from '../change-content';

const expect = chai.expect;

describe('PB: change element content', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
