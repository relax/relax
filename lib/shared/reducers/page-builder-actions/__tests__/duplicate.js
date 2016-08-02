import chai from 'chai';

import action from '../duplicate';
import {cleanupId} from '../helpers/get-id';

const expect = chai.expect;

describe('PB: duplicate element', () => {
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

    expect(result).to.be.an('object');
    expect(result).to.have.property('doc');
    expect(result).to.have.property('revertAction');
    expect(result.doc).to.not.equal(iniDoc);
    expect(result.doc).to.deep.equals(expectedDoc);
    expect(result.revertAction).to.deep.equals(expectedRevert);
  });
});
