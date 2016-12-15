

import action from '../make-dynamic';
import {cleanupId} from '../helpers/get-id';



describe('PB: make element dynamic', () => {
  afterEach(() => {
    cleanupId();
  });

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

  it('wraps an element in a DynamicList element', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          tag: 'Section',
          children: ['1']
        },
        1: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['2']
        },
        0: {
          id: '0',
          parent: '2',
          tag: 'Section',
          children: ['1']
        },
        1: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        },
        2: {
          id: '2',
          parent: 'body',
          tag: 'DynamicList',
          children: ['0']
        }
      }
    };
    const expectedRevert = [
      {
        type: 'move',
        source: {
          id: '0',
          context: 'data'
        },
        destination: {
          id: 'body',
          position: 0,
          context: 'data'
        }
      },
      {
        type: 'remove',
        elementId: '2',
        context: 'data'
      }
    ];

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
