import chai from 'chai';

import action from '../change-animation';

const expect = chai.expect;

describe('PB: change element animation', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
