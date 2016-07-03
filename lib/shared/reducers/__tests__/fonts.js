import chai from 'chai';
import fontsReducer from '../fonts';
import actionTypes from 'actions';
import Relate from 'relate-js';

const expect = chai.expect;

const defaultState = {
  previewText: '',
  display: 'grid', // grid || list
  manage: false,
  tab: 0,
  googleInput: '',
  googleValid: false,
  typekitInput: '',
  typekitValid: false,
  fontdeckInput: '',
  fontdeckValid: false,
  monotypeInput: '',
  monotypeValid: false,
  customFonts: [],
  fonts: {}
};

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
    it('for typekit', () => {
      expect(true).to.be.true;
    });
  });
});
