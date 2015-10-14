import {combineReducers} from 'redux';

import admin from './admin';
import page from './page';
import pages from './pages';
import session from './session';
import display from './display';
import colors from './colors';
import menu from './menu';
import menus from './menus';
import users from './users';

const rootReducer = combineReducers({
  admin,
  page,
  pages,
  session,
  display,
  colors,
  menu,
  menus,
  users
});

export default rootReducer;
