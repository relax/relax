import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';

import admin from './admin';
import fonts from './fonts';
import settings from './settings';
import page from './page';
import pages from './pages';
import schemas from './schemas';
import session from './session';
import display from './display';
import colors from './colors';
import menu from './menu';
import menus from './menus';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  admin,
  fonts,
  settings,
  page,
  pages,
  schemas,
  session,
  display,
  colors,
  menu,
  menus,
  user,
  users,
  router
});

export default rootReducer;
