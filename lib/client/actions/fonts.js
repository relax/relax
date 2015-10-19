import actionTypes from './types';
import loadFontsAsync from '../helpers/load-fonts';
import request from '../helpers/request';

export function changeFontsPreviewText (value) {
  return {
    type: actionTypes.changeFontsPreviewText,
    value
  };
}

export function changeFontsPreviewLayout (value) {
  return {
    type: actionTypes.changeFontsPreviewLayout,
    value
  };
}

export function changeFontInput (tab, value) {
  return {
    type: actionTypes.changeFontInput,
    tab,
    value
  };
}

export function loadFonts () {
  return (dispatch, getState) => (
    loadFontsAsync({
      dispatch,
      webfontloader: getState().fonts.data.webfontloader,
      type: actionTypes.loadFonts
    })
  );
}

export function saveFonts () {
  return (dispatch, getState) => (
    request({
      dispatch,
      type: actionTypes.saveFonts,
      query: `
        mutation saveSettings ($data: [SettingInput]!) {
          saveSettings (data: $data) {
            _id,
            value
          }
        }
      `,
      variables: {
        data: [{
          _id: 'fonts',
          value: JSON.stringify(getState().fonts.data)
        }]
      }
    })
  );
}

export function changeFontInputAndUpdate (tab, value) {
  return {
    types: [
      'UPDATE_FONTS_START',
      'UPDATE_FONTS_SUCCESS',
      'UPDATE_FONTS_ERROR'
    ],
    payload: [changeFontInput.bind(null, tab, value), loadFonts, saveFonts],
    sequence: true
  };
}
