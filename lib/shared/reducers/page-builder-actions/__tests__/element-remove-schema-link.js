import chai from 'chai';

import action from '../element-remove-schema-link';

const expect = chai.expect;

describe('PB: remove element schema link', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
