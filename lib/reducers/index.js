import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';

import admin from './admin';
import colors from './colors';
import display from './display';
import dnd from './dnd';
import draft from './draft';
import elements from './elements';
import fonts from './fonts';
import media from './media';
import menu from './menu';
import menus from './menus';
import overlays from './overlays';
import page from './page';
import pageBuilder from './page-builder';
import pages from './pages';
import revisions from './revisions';
import schema from './schema';
import schemaEntry from './schema-entry';
import schemaList from './schema-list';
import schemas from './schemas';
import session from './session';
import settings from './settings';
import styles from './styles';
import tabs from './tabs';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  admin,
  overlays,
  elements,
  fonts,
  settings,
  page,
  pages,
  revisions,
  draft,
  pageBuilder,
  styles,
  schema,
  schemaEntry,
  schemaList,
  schemas,
  session,
  display,
  dnd,
  colors,
  media,
  menu,
  menus,
  tabs,
  user,
  users,
  router
});

export default rootReducer;
