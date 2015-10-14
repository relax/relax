import {combineReducers} from 'redux';

import admin from './admin';
import page from './page';
import pages from './pages';
import session from './session';
import display from './display';
import colors from './colors';

const rootReducer = combineReducers({
  admin,
  page,
  pages,
  session,
  display,
  colors
});

export default rootReducer;
