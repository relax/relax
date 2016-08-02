import chai from 'chai';

import action from '../change-label';

const expect = chai.expect;

describe('PB: change element label', () => {
  it('should be a function', () => {
    expect(action).to.be.a('function');
  });

  it('error if not a valid action', () => {
    expect(action).to.throw(Error);
    expect(action.bind(null, {}, {
      destination: {
        invalid: 1
      }
    })).to.throw(Error);
  });

  it('changes element label', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          tag: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0',
          tag: 'TextBox',
          label: 'Something'
        }
      }
    };
    const expectedRevert = {
      type: 'changeLabel',
      elementId: '0',
      value: 'TextBox',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeLabel',
      elementId: '0',
      value: 'Something',
      context: 'data'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
