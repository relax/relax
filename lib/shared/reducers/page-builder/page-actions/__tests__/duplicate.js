

import action from '../duplicate';
import {cleanupId} from '../helpers/get-id';



describe('PB: duplicate element', () => {
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

  it('duplicates an element with children', () => {
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
          children: ['1', '2']
        },
        1: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        },
        2: {
          id: '2',
          parent: '0',
          tag: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '3']
        },
        0: {
          id: '0',
          parent: 'body',
          tag: 'Section',
          children: ['1', '2']
        },
        1: {
          id: '1',
          parent: '0',
          tag: 'TextBox'
        },
        2: {
          id: '2',
          parent: '0',
          tag: 'TextBox'
        },
        3: {
          id: '3',
          parent: 'body',
          tag: 'Section',
          children: ['4', '5']
        },
        4: {
          id: '4',
          parent: '3',
          tag: 'TextBox'
        },
        5: {
          id: '5',
          parent: '3',
          tag: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '3',
      context: 'data'
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
