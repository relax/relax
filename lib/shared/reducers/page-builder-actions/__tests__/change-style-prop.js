import chai from 'chai';

import action from '../change-style-prop';

const expect = chai.expect;

describe('PB: change element style property', () => {
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

  it('changes element style property on desktop display', () => {
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
          styleProps: {
            prop: 'something'
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'desktop',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
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

  it('removes element style property on desktop display', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          styleProps: {
            prop: 'something'
          }
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'desktop',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
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

  it('changes element style property on other display', () => {
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
          displayStyleProps: {
            mobile: {
              prop: 'something'
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'mobile',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
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

  it('remove element style property if undefined value', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          displayStyleProps: {
            mobile: {
              prop: 'something'
            }
          }
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'mobile',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
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
