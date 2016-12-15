

import action from '../change-style-prop';



describe('PB: change element style property', () => {
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

  it('changes element style property on desktop display', () => {
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
          styleProps: {
            prop: 'something'
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'desktop',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'desktop',
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('removes element style property on desktop display', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          styleProps: {
            prop: 'something'
          }
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'desktop',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'desktop',
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('changes element style property on other display', () => {
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
          displayStyleProps: {
            mobile: {
              prop: 'something'
            }
          }
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'mobile',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'mobile',
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('remove element style property if undefined value', () => {
    const iniDoc = {
      data: {
        0: {
          id: '0',
          displayStyleProps: {
            mobile: {
              prop: 'something'
            }
          }
        }
      }
    };
    const expectedDoc = {
      data: {
        0: {
          id: '0'
        }
      }
    };
    const expectedRevert = {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: 'something',
      display: 'mobile',
      context: 'data'
    };

    const result = action(iniDoc, {
      type: 'changeStyleProp',
      elementId: '0',
      property: 'prop',
      value: undefined,
      display: 'mobile',
      context: 'data'
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
