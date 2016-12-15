

import action from '../change-animation';



describe('PB: change element animation', () => {
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

  it('changes element animation', () => {
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
          animation: {
            use: true,
            effect: 'transition.fadeIn',
            duration: 400,
            delay: 300
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeAnimation',
      elementId: '0',
      property: 'use',
      context: 'data',
      value: undefined
    };

    const result = action(iniDoc, {
      type: 'changeAnimation',
      elementId: '0',
      property: 'use',
      value: true,
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
