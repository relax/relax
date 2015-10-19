import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';

import admin from './admin';
import settings from './settings';
import page from './page';
import pages from './pages';
import session from './session';
import display from './display';
import colors from './colors';
import menu from './menu';
import menus from './menus';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  admin,
  settings,
  page,
  pages,
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
