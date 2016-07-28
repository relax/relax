import chai from 'chai';

import action from '../element-change-schema-link-action';

const expect = chai.expect;

describe('PB: change element schema link action', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
