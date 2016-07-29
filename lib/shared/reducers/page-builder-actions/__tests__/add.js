import chai from 'chai';

import action from '../add';
import {cleanupId} from '../helpers/get-id';

const expect = chai.expect;

describe('PB: add element action', () => {
  afterEach(() => {
    cleanupId();
  });

  it('should be a function', () => {
    expect(action).to.be.a('function');
  });

  it('error if not a valid action', () => {
    expect(action).to.throw(Error);
    expect(action.bind(null, {}, {
      destination: {
        invalid: 1
      }
    })).to.throw(Error);
  });

  it('adds element to destination element with no children', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body'
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
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '0',
      context: 'data'
    };

    const result = action(iniDoc, {
      destination: {
        id: 'body',
        context: 'data',
        position: 0
      },
      element: {
        type: 'TextBox'
      }
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('adds element with children to destination with children', () => {
    const iniDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', 'elem2']
        },
        0: {
          parent: 'body'
        }
      }
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          children: ['0', '1', 'elem2']
        },
        0: {
          parent: 'body'
        },
        1: {
          id: '1',
          parent: 'body',
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
      context: 'data'
    };

    const result = action(iniDoc, {
      destination: {
        id: 'body',
        context: 'data',
        position: 1
      },
      element: {
        type: 'TextBox'
      },
      childrenElements: [
        {
          id: 'dsa',
          parent: 'toreplace',
          type: 'Symbol'
        },
        {
          id: 'asd',
          parent: 'needsreplace',
          type: 'TextArea'
        }
      ]
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });

  it('adds element to not created body element', () => {
    const iniDoc = {
      data: {}
    };
    const expectedDoc = {
      data: {
        body: {
          id: 'body',
          tag: 'body',
          children: ['0']
        },
        0: {
          id: '0',
          parent: 'body',
          type: 'TextBox'
        }
      }
    };
    const expectedRevert = {
      type: 'remove',
      elementId: '0',
      context: 'data'
    };

    const result = action(iniDoc, {
      destination: {
        id: 'body',
        context: 'data',
        position: 0
      },
      element: {
        type: 'TextBox'
      }
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
