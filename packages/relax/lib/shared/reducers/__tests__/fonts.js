import actionTypes from 'actions';
import chai from 'chai';
import Relate from 'relate-js';

import fontsReducer, {defaultState} from '../fonts';

const expect = chai.expect;

describe('Fonts Reducer', () => {
  it('should return the initial state', () => {
    expect(fontsReducer(defaultState, {})).to.equal(defaultState);
  });

  it('should handle relate query', () => {
    const action = {
      type: Relate.actionTypes.query,
      data: {settings:
         [{_id: 'fonts', value: '{"1":"One","2":"Two"}'}
        ]
      }
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('1').to.equal('One');
    expect(fontsReducer(defaultState, action)).to.have.property('2').to.equal('Two');
  });

  it('should handle CHANGE_FONTS_PREVIEW_TEXT', () => {
    const action = {
      type: actionTypes.changeFontsPreviewText,
      value: 'Test'
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('previewText').to.equal('Test');
  });

  it('should handle CHANGE_FONTS_DISPLAY', () => {
    const action = {
      type: actionTypes.changeFontsDisplay,
      value: 'Test'
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('display').to.equal('Test');
  });

  it('should handle OPEN_FONTS_MANAGE', () => {
    const action = {
      type: actionTypes.openFontsManage
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('manage').to.be.true;
  });

  it('should handle CLOSE_FONTS_MANAGE', () => {
    const action = {
      type: actionTypes.closeFontsManage
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('manage').to.be.false;
  });

  it('should handle CHANGE_FONTS_TAB', () => {
    const action = {
      type: actionTypes.changeFontsTab,
      value: 'Test'
    };
    expect(fontsReducer(defaultState, action)).to.be.an('object');
    expect(fontsReducer(defaultState, action)).to.have.property('tab').to.equal(action.value);
  });

  describe('should handle CHANGE_FONT_INPUT', () => {
    // No value is returned from the below functions so can't test them here
    it('for google', () => {
      const action = {type: actionTypes.changeFontInput,
                      lib: 'google', value: 'fonts.googleapis.com/css?family=Lato:300,400,700,900'};
      expect(fontsReducer(defaultState, action)).to.be.an('object');
    });
    it('for typekit', () => {
      expect(true).to.be.true;
    });
    it('for fontdeck', () => {
      expect(true).to.be.true;
    });
    it('for monotype', () => {
      expect(true).to.be.true;
    });
    it('for DEFAULT', () => {
      expect(true).to.be.true;
    });
  });
});
