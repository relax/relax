import chai from 'chai';

import action from '../change-prop';

const expect = chai.expect;

describe('PB: change element prop', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
