import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';

import admin from './admin';
import colors from './colors';
import display from './display';
import draft from './draft';
import fonts from './fonts';
import menu from './menu';
import menus from './menus';
import page from './page';
import pageBuilder from './page-builder';
import pages from './pages';
import schemas from './schemas';
import session from './session';
import settings from './settings';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  admin,
  fonts,
  settings,
  page,
  pages,
  draft,
  pageBuilder,
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
