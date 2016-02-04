import actionTypes from 'actions';
import loadFontsAsync from 'helpers/load-fonts';
import request from 'helpers/request';

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

export function _removeCustomFont (id) {
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

export function removeCustomFont (id) {
  return {
    types: [
      'REMOVE_CUSTOM_FONT_START',
      'REMOVE_CUSTOM_FONT_SUCCESS',
      'REMOVE_CUSTOM_FONT_ERROR'
    ],
    payload: [_removeCustomFont.bind(null, id), loadFonts, saveFonts],
    sequence: true
  };
}
