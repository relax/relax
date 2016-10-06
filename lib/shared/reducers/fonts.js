import actionTypes from 'actions';
import forEach from 'lodash.foreach';
import Relate from 'relate-js';

export const defaultState = {
  loading: true,
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
  tempCustomFonts: [],
  fonts: {}
};

function parseSettings (_settings) {
  const settings = {};

  forEach(_settings, (setting) => {
    settings[setting._id] = setting.value;
  });

  return settings;
}

export default function fontsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case Relate.actionTypes.query:
      if (action.data.settings) {
        const parsed = parseSettings(action.data.settings);
        if (parsed.fonts) {
          return Object.assign({}, state, JSON.parse(parsed.fonts));
        }
      }
      return state;
    case actionTypes.changeFontsPreviewText:
      return Object.assign({}, state, {
        previewText: action.value
      });
    case actionTypes.changeFontsDisplay:
      return Object.assign({}, state, {
        display: action.value
      });
    case actionTypes.openFontsManage:
      return Object.assign({}, state, {
        manage: true
      });
    case actionTypes.closeFontsManage:
      return Object.assign({}, state, {
        manage: false
      });
    case actionTypes.changeFontsTab:
      return Object.assign({}, state, {
        tab: action.value
      });
    case actionTypes.changeFontInput: {
      const {lib, value} = action;
      let valid = false;

      switch (lib) {
        case 'google': {
          const paramsSplit = value.split('?');

          if (paramsSplit.length === 2) {
            const params = {};
            const re = /[?&]?([^=]+)=([^&]*)/g;
            let tokens = re.exec(paramsSplit[1]);

            while (tokens) {
              params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
              tokens = re.exec(paramsSplit[1]);
            }

            if (params.family) {
              valid = true;
            }
          }
          break;
        }
        case 'typekit':
          valid = value.length === 7;
          break;
        case 'fontdeck':
          valid = value.length === 5;
          break;
        case 'monotype': {
          const regex = new RegExp(/[0-9|a-z]{8}-[0-9|a-z]{4}-[0-9|a-z]{4}-[0-9|a-z]{4}-[0-9|a-z]{12}/g);
          valid = value.length === 36 && regex.test(value);
          break;
        }
        default:
          valid = false;
      }

      return Object.assign({}, state, {
        [`${lib}Input`]: value,
        [`${lib}Valid`]: valid
      });
    }
    case actionTypes.loadingFonts:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.loadFonts:
      return Object.assign({}, state, {
        loading: false,
        fonts: action.fonts
      });
    case actionTypes.addCustomFonts:
      return Object.assign({}, state, {
        tempCustomFonts: [...state.tempCustomFonts, ...action.files]
      });
    case actionTypes.removeCustomTempFont: {
      const tempCustomFonts = state.tempCustomFonts.slice(0);
      tempCustomFonts.splice(action.index, 1);

      return Object.assign({}, state, {
        tempCustomFonts
      });
    }
    case actionTypes.customFontsUploaded:
      return Object.assign({}, state, {
        customFonts: [...state.customFonts, ...action.fonts],
        tempCustomFonts: []
      });

    // case actionTypes.submitCustomFont:
    //   return Object.assign({}, state, {
    //     data: Object.assign({}, state.data, {
    //       customFonts: [...state.data.customFonts, action.data.submitCustomFont]
    //     }),
    //     newCustom: action.data.submitCustomFont,
    //     errors: action.errors
    //   });
    // case actionTypes.customFontIncluded: {
    //   const fontsDataClone = cloneDeep(state.data);
    //   fontsDataClone.webfontloader.custom = fontsDataClone.webfontloader.custom || {families: []};
    //   fontsDataClone.webfontloader.custom.families.push(state.newCustom.family);
    //   return Object.assign({}, state, {
    //     data: fontsDataClone,
    //     newCustom: null
    //   });
    // }
    // case actionTypes.removeCustomFont: {
    //   const fontsDataRemoveClone = cloneDeep(state.data);
    //   const id = action.data.removeCustomFont.id;
    //   forEach(fontsDataRemoveClone.customFonts, (obj, index) => {
    //     if (obj.id === id) {
    //       fontsDataRemoveClone.customFonts.splice(index, 1);
    //
    //       const ind = fontsDataRemoveClone.webfontloader.custom.families.indexOf(obj.family);
    //       if (ind !== -1) {
    //         fontsDataRemoveClone.webfontloader.custom.families.splice(ind, 1);
    //         if (fontsDataRemoveClone.webfontloader.custom.families.length === 0) {
    //           delete fontsDataRemoveClone.webfontloader.custom;
    //         }
    //       }
    //
    //       return false;
    //     }
    //   });
    //   return Object.assign({}, state, {
    //     data: fontsDataRemoveClone
    //   });
    // }
    default:
      return state;
  }
}
