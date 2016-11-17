import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import color from './color';
import styles from './styles';
import stylesMap from './styles-map';
import fonts from './fonts';

export const reducersToCombine = {
  relateReducer,
  color,
  styles,
  fonts,
  router,
  stylesMap
};
const rootReducer = combineReducers(reducersToCombine);

export default rootReducer;
