import chai from 'chai';

import action from '../change-link-action';

const expect = chai.expect;

describe('PB: change element schema link action', () => {
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

  it('changes element schema link action', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          props: {
            schemaLinks: {
              someElem: [
                {
                  property: 'property',
                  action: 'content'
                }
              ]
            }
          }
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0',
          props: {
            schemaLinks: {
              someElem: [
                {
                  property: 'property',
                  action: 'another'
                }
              ]
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeLinkAction',
      elementId: '0',
      context: 'data',
      linkElementId: 'someElem',
      index: 0,
      value: 'content'
    };

    const result = action(iniDoc, {
      type: 'changeLinkAction',
      elementId: '0',
      context: 'data',
      linkElementId: 'someElem',
      index: 0,
      value: 'another'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('changes template schema link action', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0'
        }
      },
      links: {
        schemaX: {
          someElem: [
            {
              property: 'property',
              action: 'content'
            }
          ]
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0'
        }
      },
      links: {
        schemaX: {
          someElem: [
            {
              property: 'property',
              action: 'another'
            }
          ]
        }
      }
    };
    const expectedRevert = {
      type: 'changeLinkAction',
      schemaId: 'schemaX',
      linkElementId: 'someElem',
      index: 0,
      value: 'content'
    };

    const result = action(iniDoc, {
      type: 'changeLinkAction',
      schemaId: 'schemaX',
      linkElementId: 'someElem',
      index: 0,
      value: 'another'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
