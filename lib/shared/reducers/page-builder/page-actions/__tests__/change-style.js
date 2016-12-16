import action from '../change-style';

describe('PB: change element style', () => {
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

  it('changes element style', () => {
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
          style: 'something'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyle',
      elementId: '0',
      value: undefined,
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      type: 'changeStyle',
      elementId: '0',
      value: 'something',
      context: {
        doc: 'draft',
        property: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);

    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
