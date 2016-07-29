import chai from 'chai';

import action from '../remove';

const expect = chai.expect;

describe('PB: remove element action', () => {
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

  it('removes an element with children', () => {
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
          children: []
        }
      }
    };
    const expectedRevert = {
      type: 'add',
      element: {
        id: '0',
        parent: 'body',
        type: 'Section',
        children: ['1']
      },
      childrenElements: {
        1: {
          id: '1',
          parent: '0',
          type: 'TextBox'
        }
      },
      destination: {
        id: 'body',
        position: 0,
        context: 'data'
      }
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
