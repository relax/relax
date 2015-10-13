import {combineReducers} from 'redux';

import admin from './admin';
import page from './page';
import pages from './pages';
import session from './session';
import display from './display';

const rootReducer = combineReducers({
  admin,
  page,
  pages,
  session,
  display
});

export default rootReducer;
