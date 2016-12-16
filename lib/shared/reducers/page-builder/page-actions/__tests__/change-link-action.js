import action from '../change-link-action';

describe('PB: change element schema link action', () => {
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
      context: {
        doc: 'draft',
        property: 'data'
      },
      linkElementId: 'someElem',
      index: 0,
      value: 'content'
    };

    const result = action(iniDoc, {
      type: 'changeLinkAction',
      elementId: '0',
      context: {
        doc: 'draft',
        property: 'data'
      },
      linkElementId: 'someElem',
      index: 0,
      value: 'another'
    });

    expect(result).toBeInstanceOf(Object);


    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
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

    expect(result).toBeInstanceOf(Object);


    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
