

import action from '../remove';



describe('PB: remove element action', () => {
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

  it('removes an element with children', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: ['1']
        },
        1: {
          id: '1',
          parent: '0',
          type: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: []
        }
      }
    };
    const expectedRevert = {
      type: 'add',
      element: {
        id: '0',
        parent: 'body',
        type: 'Section',
        children: ['1']
      },
      childrenElements: {
        1: {
          id: '1',
          parent: '0',
          type: 'TextBox'
        }
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'data'
      }
    };

    const result = action(iniDoc, {
      elementId: '0',
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);

    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
