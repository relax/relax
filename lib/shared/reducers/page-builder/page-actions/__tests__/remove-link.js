import chai from 'chai';

import action from '../remove-link';

const expect = chai.expect;

describe('PB: remove element schema link', () => {
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

  it('removes an element schema link', () => {
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
            schemaLinks: {}
          }
        }
      }
    };
    const expectedRevert = {
      type: 'addLink',
      elementId: '0',
      context: 'data',
      property: 'property',
      linkElementId: 'someElem',
      action: 'content'
    };

    const result = action(iniDoc, {
      type: 'removeLink',
      elementId: '0',
      context: 'data',
      linkElementId: 'someElem',
      index: 0
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('removes a template schema link', () => {
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
        schemaX: {}
      }
    };
    const expectedRevert = {
      type: 'addLink',
      schemaId: 'schemaX',
      property: 'property',
      linkElementId: 'someElem',
      action: 'content'
    };

    const result = action(iniDoc, {
      type: 'removeLink',
      schemaId: 'schemaX',
      linkElementId: 'someElem',
      index: 0
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
