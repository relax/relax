

import action from '../change-children';
import {cleanupId} from '../helpers/get-id';



describe('PB: change element children action', () => {
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

  it('changes element children and returns correct revert action', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          children: ['1']
        },
        1: {
          id: '1',
          parent: '0',
          children: ['toremove']
        },
        toremove: {
          id: 'toremove',
          parent: '1',
          type: 'Symbol'
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0',
          children: ['2', '3']
        },
        2: {
          id: '2',
          parent: '0',
          tag: 'TextBox'
        },
        3: {
          id: '3',
          parent: '0',
          tag: 'TextBox',
          children: ['4']
        },
        4: {
          id: '4',
          parent: '3',
          tag: 'Symbol'
        }
      }
    };
    const expectedRevert = {
      type: 'changeChildren',
      elementId: '0',
      children: ['1'],
      elements: {
        1: {
          id: '1',
          parent: '0',
          children: ['toremove']
        },
        toremove: {
          id: 'toremove',
          parent: '1',
          type: 'Symbol'
        }
      },
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeChildren',
      elementId: '0',
      children: ['toreplace', 'another'],
      elements: {
        toreplace: {
          id: 'toreplace',
          parent: 'asd',
          tag: 'TextBox'
        },
        another: {
          id: 'another',
          parent: 'asddsa',
          tag: 'TextBox',
          children: ['anotherChild']
        },
        anotherChild: {
          id: 'anotherChild',
          parent: 'another',
          tag: 'Symbol'
        }
      },
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
