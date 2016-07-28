import chai from 'chai';

import action from '../element-add-schema-link';

const expect = chai.expect;

describe('PB: add schema link to element', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });
});
