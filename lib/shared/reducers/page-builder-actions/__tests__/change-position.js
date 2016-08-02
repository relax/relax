import chai from 'chai';

import action from '../change-position';

const expect = chai.expect;

describe('PB: change element position', () => {
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

  it('changes element position on desktop display', () => {
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
          position: {
            position: 'absolute',
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto',
            zIndex: '1'
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changePosition',
      elementId: '0',
      property: 'position',
      value: 'static',
      display: 'desktop',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changePosition',
      elementId: '0',
      property: 'position',
      value: 'absolute',
      display: 'desktop',
      context: 'data'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('changes element position on other display', () => {
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
          displayPosition: {
            mobile: {
              position: 'absolute'
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changePosition',
      elementId: '0',
      property: 'position',
      value: undefined,
      display: 'mobile',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changePosition',
      elementId: '0',
      property: 'position',
      value: 'absolute',
      display: 'mobile',
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
