import action from '../remove-link';

describe('PB: remove element schema link', () => {
  it('should be a function', () => {
    expect(action).toBeInstanceOf(Function);
  });

  it('error if not a valid action', () => {
    expect(action).toThrow();
    expect(action.bind(null, {}, {
      destination: {
        invalid: 1
      }
    })).toThrow();
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
      context: {
        doc: 'draft',
        property: 'data'
      },
      property: 'property',
      linkElementId: 'someElem',
      action: 'content'
    };

    const result = action(iniDoc, {
      type: 'removeLink',
      elementId: '0',
      context: {
        doc: 'draft',
        property: 'data'
      },
      linkElementId: 'someElem',
      index: 0
    });

    expect(result).toBeInstanceOf(Object);

    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
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

    expect(result).toBeInstanceOf(Object);

    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
