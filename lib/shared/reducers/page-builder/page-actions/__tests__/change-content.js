import action from '../change-content';

describe('PB: change element content', () => {
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

  it('changes element content', () => {
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
          children: 'Something'
        }
      }
    };
    const expectedRevert = {
      type: 'changeContent',
      elementId: '0',
      value: '',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      type: 'changeContent',
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
