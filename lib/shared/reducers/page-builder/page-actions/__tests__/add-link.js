import chai from 'chai';

import action from '../add-link';

const expect = chai.expect;

describe('PB: add schema link to element', () => {
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

  it('adds schema link to element', () => {
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
          props: {
            schemaLinks: {
              someElem: [{
                property: 'property',
                action: 'content'
              }]
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'removeLink',
      elementId: '0',
      context: 'data',
      linkElementId: 'someElem',
      index: 0
    };

    const result = action(iniDoc, {
      type: 'addLink',
      elementId: '0',
      context: 'data',
      linkElementId: 'someElem',
      property: 'property',
      action: 'content'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('adds schema link to template links', () => {
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
          id: '0'
        }
      },
      links: {
        schemaX: {
          someElem: [{
            property: 'property',
            action: 'content'
          }]
        }
      }
    };
    const expectedRevert = {
      type: 'removeLink',
      schemaId: 'schemaX',
      linkElementId: 'someElem',
      index: 0
    };

    const result = action(iniDoc, {
      type: 'addLink',
      schemaId: 'schemaX',
      linkElementId: 'someElem',
      property: 'property',
      action: 'content'
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
