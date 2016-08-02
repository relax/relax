import chai from 'chai';

import action from '../change-animation';

const expect = chai.expect;

describe('PB: change element animation', () => {
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

  it('changes element animation', () => {
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
          animation: {
            use: true,
            effect: 'transition.fadeIn',
            duration: 400,
            delay: 300
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeAnimation',
      elementId: '0',
      property: 'use',
      context: 'data',
      value: undefined
    };

    const result = action(iniDoc, {
      type: 'changeAnimation',
      elementId: '0',
      property: 'use',
      value: true,
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
