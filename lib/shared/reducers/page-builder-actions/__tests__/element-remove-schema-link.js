import chai from 'chai';

import action from '../element-remove-schema-link';

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
              property: [
                {
                  elementId: 'someElem',
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
              property: []
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'elementAddSchemaLink',
      elementId: '0',
      propertyId: 'property',
      linkElementId: 'someElem',
      action: 'content',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'elementRemoveSchemaLink',
      elementId: '0',
      propertyId: 'property',
      index: 0,
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
