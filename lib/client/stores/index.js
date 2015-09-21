import forEach from 'lodash.foreach';
import merge from 'lodash.merge';

import colors from './colors';
import drafts from './drafts';
import elements from './elements';
import fonts from './fonts';
import media from './media';
import pages from './pages';
import revisions from './revisions';
import schemaEntries from './schema-entries';
import schemas from './schemas';
import session from './session';
import settings from './settings';
import styles from './styles';
import tabs from './tabs';
import users from './users';

var stores = {
  colors,
  drafts,
  elements,
  fonts,
  media,
  pages,
  revisions,
  schemaEntries,
  schemas,
  session,
  settings,
  styles,
  tabs,
  users
};

export default merge({
  initStores: (data) => {
    forEach(stores, (store, key) => {
      if (data[key]) {
        store.data = data[key];
      }
    });
  }
}, stores);
