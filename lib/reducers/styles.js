import filter from 'lodash.filter';
import find from 'lodash.find';
import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const defaultState = {
  data: [],
  errors: null
};

const parsableFields = ['options', 'displayOptions'];

export default function stylesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.styles) {
        const styles = [];
        forEach(action.data.styles, (style) => {
          styles.push(parseFields(style, parsableFields));
        });
        return Object.assign({}, state, {
          data: styles,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.saveStyle:
      const newStyle = parseFields(action.data.addStyle, parsableFields);
      return Object.assign({}, state, {
        data: [...state.data, newStyle],
        errors: action.errors
      });
    case actionTypes.changeStyleProp:
      const data = state.data.slice(0);
      const style = find(data, {_id: action.styleId});

      if (action.display === 'desktop') {
        Object.assign(style, {
          options: Object.assign({}, style.options, {
            [action.property]: action.value
          })
        });
      } else {
        Object.assign(style, {
          displayOptions: Object.assign({}, style.displayOptions || {}, {
            [action.display]: Object.assign({}, style.displayOptions && style.displayOptions[action.display] || {}, {
              [action.property]: action.value
            })
          })
        });
      }

      return Object.assign({}, state, {
        data
      });
    case actionTypes.removeStyle:
      return Object.assign({}, state, {
        data: filter(state.data, (styleIt) => {
          return styleIt._id !== action.data.removeStyle._id;
        }),
        errors: action.errors
      });
    default:
      return state;
  }
}
