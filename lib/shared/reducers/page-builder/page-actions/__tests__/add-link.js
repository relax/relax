import action from '../add-link';

describe('PB: add schema link to element', () => {
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

    expect(result).toBeInstanceOf(Object);
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
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

    expect(result).toBeInstanceOf(Object);
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
