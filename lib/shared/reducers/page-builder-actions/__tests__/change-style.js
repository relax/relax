import chai from 'chai';

import action from '../change-style';

const expect = chai.expect;

describe('PB: change element style', () => {
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

  it('changes element style', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0'
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0',
          style: 'something'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyle',
      elementId: '0',
      value: undefined,
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyle',
      elementId: '0',
      value: 'something',
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
