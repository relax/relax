import actionTypes from 'actions';
import filter from 'lodash.filter';
import find from 'lodash.find';
import forEach from 'lodash.foreach';
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
      const style = find(styles, {_id: action.style._id});

      Object.assign(style, action.style);

      return styles;
    }
    case actionTypes.removeStyle:
      return filter(state, (styleIt) => (styleIt._id !== action.style._id));
    default:
      return state;
  }
}
