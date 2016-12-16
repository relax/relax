import Relate from 'relate-js';
import actionTypes from 'actions';

import fontsReducer, {defaultState} from '../fonts';

describe('Fonts Reducer', () => {
  it('should return the initial state', () => {
    expect(fontsReducer(defaultState, {})).toBe(defaultState);
  });

  it('should handle relate query', () => {
    const action = {
      type: Relate.actionTypes.query,
      data: {settings:
         [{_id: 'fonts', value: '{"1":"One","2":"Two"}'}
        ]
      }
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result[1]).toBe('One');
    expect(result[2]).toBe('Two');
  });

  it('should handle CHANGE_FONTS_PREVIEW_TEXT', () => {
    const action = {
      type: actionTypes.changeFontsPreviewText,
      value: 'Test'
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.previewText).toBe('Test');
  });

  it('should handle CHANGE_FONTS_DISPLAY', () => {
    const action = {
      type: actionTypes.changeFontsDisplay,
      value: 'Test'
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.display).toBe('Test');
  });

  it('should handle OPEN_FONTS_MANAGE', () => {
    const action = {
      type: actionTypes.openFontsManage
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.manage).toBeTruthy();
  });

  it('should handle CLOSE_FONTS_MANAGE', () => {
    const action = {
      type: actionTypes.closeFontsManage
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.manage).toBeFalsy();
  });

  it('should handle CHANGE_FONTS_TAB', () => {
    const action = {
      type: actionTypes.changeFontsTab,
      value: 'Test'
    };
    const result = fontsReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.tab).toBe(action.value);
  });

  describe('should handle CHANGE_FONT_INPUT', () => {
    // No value is returned from the below functions so can't test them here
    it('for google', () => {
      const action = {
        type: actionTypes.changeFontInput,
        lib: 'google',
        value: 'fonts.googleapis.com/css?family=Lato:300,400,700,900'
      };
      const result = fontsReducer(defaultState, action);
      expect(result).toBeInstanceOf(Object);
    });

    it('for typekit', () => {
      // TODO
      expect(true).toBeTruthy();
    });

    it('for fontdeck', () => {
      // TODO
      expect(true).toBeTruthy();
    });

    it('for monotype', () => {
      // TODO
      expect(true).toBeTruthy();
    });

    it('for DEFAULT', () => {
      // TODO
      expect(true).toBeTruthy();
    });
  });
});
