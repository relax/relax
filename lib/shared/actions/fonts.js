import actionTypes from 'actions';
import loadFontsAsync from 'helpers/fonts/load-fonts';
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

async function uploadFont (fileBlob, dispatch, getState) {
  return new Promise((resolve, reject) => {
    const uploadFile = file => event => {
      mutation({
        fragments: {
          uploadFont: {
            family: 1,
            file: 1
          }
        },
        variables: {
          uploadFont: {
            file: {
              type: 'InputFile!',
              value: {
                file: event.target.result,
                filename: file.name
              }
            }
          }
        }
      }, (result) => {
        if (result.uploadFont) {
          resolve(result.uploadFont);
        } else {
          reject('Error uploading font');
        }
      })(dispatch, getState);
    };

    const reader = new FileReader();
    reader.onload = uploadFile(fileBlob);
    reader.readAsDataURL(fileBlob);
  });
}

async function uploadFonts (files, dispatch, getState) {
  const fonts = [];

  for (const file of files) {
    try {
      const font = await uploadFont(file, dispatch, getState);
      fonts.push(font);
    } catch (err) {
      console.log(err);
    }
  }

  return fonts;
}

export function closeFontsManage () {
  return async (dispatch, getState) => {
    // Custom fonts upload
    const tempFonts = getState().fonts.tempCustomFonts;
    if (tempFonts.length) {
      const customFonts = await uploadFonts(tempFonts, dispatch, getState);
      dispatch({
        type: actionTypes.customFontsUploaded,
        fonts: customFonts
      });
    }

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
    dispatch({
      type: actionTypes.loadingFonts
    });
    const newFonts = await loadFontsAsync(getState().fonts);
    dispatch({
      type: actionTypes.loadFonts,
      fonts: newFonts
    });
  };
}

export function addCustomFonts (files) {
  return {
    type: actionTypes.addCustomFonts,
    files
  };
}

export function removeCustomTempFont (index) {
  return {
    type: actionTypes.removeCustomTempFont,
    index
  };
}

// function _includeCustomFont () {
//   return (dispatch, getState) => {
//     const newCustom = getState().fonts.newCustom;
//     if (newCustom) {
//       const id = newCustom.id;
//       const map = newCustom.files;
//
//       let css = `
//       @font-face {
//         font-family: "${newCustom.family}";
//         src: url('/fonts/${id}/${map.eot}');
//         src:
//       `;
//
//       if (map.woff2) {
//         css += `url('/fonts/${id}/${map.woff2}'), `;
//       }
//
//       css += `
//         url('/fonts/${id}/${map.woff}'),
//         url('/fonts/${id}/${map.ttf}');
//       }
//       `;
//
//       const styleTag = document.createElement('style');
//       styleTag.type = 'text/css';
//       document.getElementsByTagName('head')[0].appendChild(styleTag);
//
//       if (styleTag.styleSheet) {
//         styleTag.styleSheet.cssText = css;
//       } else {
//         styleTag.appendChild(document.createTextNode(css));
//       }
//     }
//     dispatch({
//       type: actionTypes.customFontIncluded
//     });
//   };
// }
//
// function _submitCustomFont (name, files, types) {
//   return (dispatch) => (
//     request({
//       dispatch,
//       type: actionTypes.submitCustomFont,
//       query: `
//         mutation submitCustomFont ($name: String!, $files: [UploadedFileInput]!, $types: [String]!) {
//           submitCustomFont (name: $name, files: $files, types: $types) {
//             family,
//             id,
//             files {
//               eot,
//               woff2,
//               woff,
//               ttf
//             }
//           }
//         }
//       `,
//       variables: {
//         name,
//         files,
//         types
//       }
//     })
//   );
// }
//
// export function submitCustomFont (name, files, types) {
//   return {
//     types: [
//       'SUBMIT_CUSTOM_FONT_START',
//       'SUBMIT_CUSTOM_FONT_SUCCESS',
//       'SUBMIT_CUSTOM_FONT_ERROR'
//     ],
//     payload: [_submitCustomFont.bind(null, name, files, types), _includeCustomFont, loadFonts, saveFonts],
//     sequence: true
//   };
// }
//
// export function removeCustomFont (id) {
//   return (dispatch) => (
//     request({
//       dispatch,
//       type: actionTypes.removeCustomFont,
//       query: `
//         mutation removeCustomFont ($id: String!) {
//           removeCustomFont (id: $id) {
//             id
//           }
//         }
//       `,
//       variables: {
//         id
//       }
//     })
//   );
// }
