import actionTypes from 'actions';
import loadFontsAsync from 'helpers/fonts/load-fonts';
import request from 'helpers/request';
import {mutation} from 'relate-js';

export function changeFontsPreviewText (value) {
  return {
    type: actionTypes.changeFontsPreviewText,
    value
  };
}

export function changeFontsDisplay (value) {
  return {
    type: actionTypes.changeFontsDisplay,
    value
  };
}


export function openFontsManage () {
  return {
    type: actionTypes.openFontsManage
  };
}

export function closeFontsManage () {
  return (dispatch, getState) => {
    const fonts = getState().fonts;
    const data = {
      googleInput: fonts.googleInput,
      googleValid: fonts.googleValid,
      typekitInput: fonts.typekitInput,
      typekitValid: fonts.typekitValid,
      fontdeckInput: fonts.fontdeckInput,
      fontdeckValid: fonts.fontdeckValid,
      monotypeInput: fonts.monotypeInput,
      monotypeValid: fonts.monotypeValid,
      customFonts: fonts.customFonts
    };
    mutation({
      fragments: {
        saveSetting: {
          _id: 1,
          value: 1
        }
      },
      variables: {
        saveSetting: {
          data: {
            type: 'SettingInput!',
            value: {
              _id: 'fonts',
              value: JSON.stringify(data)
            }
          }
        }
      }
    }, async () => {
      const newFonts = await loadFontsAsync(data);
      dispatch({
        type: actionTypes.loadFonts,
        fonts: newFonts
      });
      dispatch({
        type: actionTypes.closeFontsManage
      });
    })(dispatch, getState);
  };
}

export function changeFontsTab (value) {
  return {
    type: actionTypes.changeFontsTab,
    value
  };
}

export function changeFontInput (lib, value) {
  return {
    type: actionTypes.changeFontInput,
    lib,
    value
  };
}

export function loadFonts () {
  return async (dispatch, getState) => {
    const newFonts = await loadFontsAsync(getState().fonts);
    dispatch({
      type: actionTypes.loadFonts,
      fonts: newFonts
    });
  };
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

function _includeCustomFont () {
  return (dispatch, getState) => {
    const newCustom = getState().fonts.newCustom;
    if (newCustom) {
      const id = newCustom.id;
      const map = newCustom.files;

      let css = `
      @font-face {
        font-family: "${newCustom.family}";
        src: url('/fonts/${id}/${map.eot}');
        src:
      `;

      if (map.woff2) {
        css += `url('/fonts/${id}/${map.woff2}'), `;
      }

      css += `
        url('/fonts/${id}/${map.woff}'),
        url('/fonts/${id}/${map.ttf}');
      }
      `;

      const styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(styleTag);

      if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = css;
      } else {
        styleTag.appendChild(document.createTextNode(css));
      }
    }
    dispatch({
      type: actionTypes.customFontIncluded
    });
  };
}

function _submitCustomFont (name, files, types) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.submitCustomFont,
      query: `
        mutation submitCustomFont ($name: String!, $files: [UploadedFileInput]!, $types: [String]!) {
          submitCustomFont (name: $name, files: $files, types: $types) {
            family,
            id,
            files {
              eot,
              woff2,
              woff,
              ttf
            }
          }
        }
      `,
      variables: {
        name,
        files,
        types
      }
    })
  );
}

export function submitCustomFont (name, files, types) {
  return {
    types: [
      'SUBMIT_CUSTOM_FONT_START',
      'SUBMIT_CUSTOM_FONT_SUCCESS',
      'SUBMIT_CUSTOM_FONT_ERROR'
    ],
    payload: [_submitCustomFont.bind(null, name, files, types), _includeCustomFont, loadFonts, saveFonts],
    sequence: true
  };
}

export function removeCustomFont (id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeCustomFont,
      query: `
        mutation removeCustomFont ($id: String!) {
          removeCustomFont (id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}
