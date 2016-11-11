import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import color from './color';
import styles from './styles';
import stylesMap from './styles-map';

export const reducersToCombine = {
  relateReducer,
  color,
  styles,
  router,
  stylesMap
};
const rootReducer = combineReducers(reducersToCombine);

export default rootReducer;
