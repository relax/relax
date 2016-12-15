

import action from '../move';
import {cleanupId} from '../helpers/get-id';



describe('PB: move element action', () => {
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

  it('moves element to destination element with same context and different parent', () => {
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
          children: ['0', '1']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: []
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: '0',
        position: 0,
        context: 'data'
      }
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 1,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('moves element to destination element with same context and same parent', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '1']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: []
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['1', '0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: []
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 1,
        context: 'data'
      }
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('moves element to destination element with same context and same parent (reverse)', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '1']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: []
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['1', '0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section',
          children: []
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
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
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '0',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 1,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('moves element to destination element with different contexts', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section'
        }
      },
      anotherData: {
        body: {
          id: 'body',
          children: ['1']
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'Section'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '1']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section'
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'Section'
        }
      },
      anotherData: {
        body: {
          id: 'body',
          children: []
        }
      }
    };
    const expectedRevert = {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'anotherData'
      }
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '1',
        context: 'anotherData'
      },
      destination: {
        id: 'body',
        position: 1,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('moves element to destination element with different contexts with no children', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section'
        }
      },
      anotherData: {
        body: {
          id: 'body',
          children: ['1']
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'Section'
        }
      }
    };
    const expectedDoc = {
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
          type: 'Section'
        }
      },
      anotherData: {
        body: {
          id: 'body',
          children: []
        }
      }
    };
    const expectedRevert = {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'anotherData'
      }
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '1',
        context: 'anotherData'
      },
      destination: {
        id: '0',
        position: 0,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });

  it('moves element with children to destination element with different contexts', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section'
        }
      },
      anotherData: {
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
          parent: 'body',
          type: 'Section'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '1']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'Section'
        },
        1: {
          id: '1',
          parent: 'body',
          type: 'Section',
          children: ['2']
        },
        2: {
          id: '2',
          parent: '1',
          type: 'Section'
        }
      },
      anotherData: {
        body: {
          id: 'body',
          children: []
        }
      }
    };
    const expectedRevert = {
      type: 'move',
      source: {
        id: '1',
        context: 'data'
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'anotherData'
      }
    };

    const result = action(iniDoc, {
      type: 'move',
      source: {
        id: '0',
        context: 'anotherData'
      },
      destination: {
        id: 'body',
        position: 1,
        context: 'data'
      }
    });

    expect(result).toBeInstanceOf(Object);
    
    
    expect(result.doc).not.toBe(iniDoc);
    expect(result.doc).toEqual(expectedDoc);
    expect(result.revertAction).toEqual(expectedRevert);
  });
});
