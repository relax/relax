import action from '../add';
import {cleanupId} from '../helpers/get-id';

describe('PB: add element action', () => {
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

  it('adds element to destination element with no children', () => {
    const iniDoc = {
      data: {
        Body: {
          id: 'Body'
        }
      }
    };
    const expectedDoc = {
      data: {
        Body: {
          id: 'Body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'Body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '0',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      destination: {
        id: 'Body',
        position: 0
      },
      context: {
        doc: 'draft',
        property: 'data'
      },
      element: {
        type: 'TextBox'
      }
    });

    expect(result).toBeInstanceOf(Object);


    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('adds element with children to destination with children', () => {
    const iniDoc = {
      data: {
        Body: {
          id: 'Body',
          children: ['0', 'elem2']
        },
        0: {
          parent: 'Body'
        }
      }
    };
    const expectedDoc = {
      data: {
        Body: {
          id: 'Body',
          children: ['0', '1', 'elem2']
        },
        0: {
          parent: 'Body'
        },
        1: {
          id: '1',
          parent: 'Body',
          type: 'TextBox',
          children: ['2', '3']
        },
        2: {
          id: '2',
          parent: '1',
          type: 'Symbol'
        },
        3: {
          id: '3',
          parent: '1',
          type: 'TextArea'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '1',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      destination: {
        id: 'Body',
        position: 1
      },
      context: {
        doc: 'draft',
        property: 'data'
      },
      element: {
        type: 'TextBox',
        children: ['dsa', 'asd']
      },
      childrenElements: {
        dsa: {
          id: 'dsa',
          parent: 'toreplace',
          type: 'Symbol'
        },
        asd: {
          id: 'asd',
          parent: 'needsreplace',
          type: 'TextArea'
        }
      }
    });

    expect(result).toBeInstanceOf(Object);
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('adds element with children to destination with children recursive', () => {
    const iniDoc = {
      data: {
        Body: {
          id: 'Body',
          children: ['0']
        },
        0: {
          parent: 'Body'
        }
      }
    };
    const expectedDoc = {
      data: {
        Body: {
          id: 'Body',
          children: ['0', '1']
        },
        0: {
          parent: 'Body'
        },
        1: {
          id: '1',
          parent: 'Body',
          type: 'TextBox',
          children: ['2']
        },
        2: {
          id: '2',
          parent: '1',
          type: 'Symbol',
          children: ['3']
        },
        3: {
          id: '3',
          parent: '2',
          type: 'TextArea'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '1',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      destination: {
        id: 'Body',
        position: 1
      },
      context: {
        doc: 'draft',
        property: 'data'
      },
      element: {
        type: 'TextBox',
        children: ['dsa']
      },
      childrenElements: {
        dsa: {
          id: 'dsa',
          parent: 'toreplace',
          type: 'Symbol',
          children: ['asd']
        },
        asd: {
          id: 'asd',
          parent: 'needsreplace',
          type: 'TextArea'
        }
      }
    });

    expect(result).toBeInstanceOf(Object);
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('adds element to not created Body element', () => {
    const iniDoc = {
      data: {}
    };
    const expectedDoc = {
      data: {
        Body: {
          id: 'Body',
          tag: 'Body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'Body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '0',
      context: {
        doc: 'draft',
        property: 'data'
      }
    };

    const result = action(iniDoc, {
      destination: {
        id: 'Body',
        position: 0
      },
      context: {
        doc: 'draft',
        property: 'data'
      },
      element: {
        type: 'TextBox'
      }
    });

    expect(result).toBeInstanceOf(Object);
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
