import action from '../change-label';

describe('PB: change element label', () => {
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

  it('changes element label', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          tag: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0',
          tag: 'TextBox',
          label: 'Something'
        }
      }
    };
    const expectedRevert = {
      type: 'changeLabel',
      elementId: '0',
      value: 'TextBox',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      type: 'changeLabel',
      elementId: '0',
      value: 'Something',
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
