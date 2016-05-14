import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import adminMenu from './admin-menu';
import color from './color';
import display from './display';
import dnd from './dnd';
import fonts from './fonts';
import media from './media';
import menu from './menu';
import pageBuilder from './page-builder';
import schema from './schema';
import schemaEntry from './schema-entry';
import settings from './settings';
import styles from './styles';
import symbols from './symbols';
import template from './template';

const rootReducer = combineReducers({
  relateReducer,
  adminMenu,
  color,
  display,
  dnd,
  fonts,
  media,
  menu,
  pageBuilder,
  schema,
  schemaEntry,
  settings,
  styles,
  symbols,
  router,
  template
});

export default rootReducer;
