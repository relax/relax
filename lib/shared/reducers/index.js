import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import adminMenu from './admin-menu';
import display from './display';
import dnd from './dnd';
import elements from './elements';
import fonts from './fonts';
import media from './media';
import menu from './menu';
import menus from './menus';
import overlays from './overlays';
import page from './page';
import pageBuilder from './page-builder';
import revisions from './revisions';
import schema from './schema';
import schemaEntry from './schema-entry';
import schemaList from './schema-list';
import session from './session';
import settings from './settings';
import styles from './styles';
import symbols from './symbols';
import tabs from './tabs';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  relateReducer,
  adminMenu,
  overlays,
  elements,
  fonts,
  settings,
  page,
  revisions,
  pageBuilder,
  styles,
  symbols,
  schema,
  schemaEntry,
  schemaList,
  session,
  display,
  dnd,
  media,
  menu,
  menus,
  tabs,
  user,
  users,
  router
});

export default rootReducer;
