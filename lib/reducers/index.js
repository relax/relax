import {combineReducers} from 'redux';

import admin from './admin';
import page from './page';
import pages from './pages';
import session from './session';

const rootReducer = combineReducers({
  admin,
  page,
  pages,
  session
});

export default rootReducer;
