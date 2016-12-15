import chai from 'chai';

import action from '../make-dynamic';
import {cleanupId} from '../helpers/get-id';

const expect = chai.expect;

describe('PB: make element dynamic', () => {
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

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
