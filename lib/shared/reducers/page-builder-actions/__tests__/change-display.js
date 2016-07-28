import chai from 'chai';

import action from '../change-display';

const expect = chai.expect;

describe('PB: change element display at', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
