import actionTypes from 'actions';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import forEach from 'lodash/forEach';
import Relate from 'relate-js';

const defaultState = [];

export default function stylesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case Relate.actionTypes.query:
      if (action.data.styles) {
        const styles = [];

        forEach(action.data.styles, (style) => {
          styles.push(style);
        });

        return styles;
      }
      return state;
    case actionTypes.saveStyle:
      return [...state, action.style];
    case actionTypes.updateStyle: {
      const styles = state.slice(0);
      const styleIndex = findIndex(styles, {_id: action.style._id});

      const newStyle = Object.assign({}, styles[styleIndex], action.style);
      styles[styleIndex] = newStyle;

      return styles;
    }
    case actionTypes.removeStyle:
      return filter(state, (styleIt) => (styleIt._id !== action.style._id));
    default:
      return state;
  }
}
