import forEach from 'lodash.foreach';

import colors from './colors';
import schemaEntries from './schema-entries';
import elements from './elements';
import fonts from './fonts';
import media from './media';
import pages from './pages';
import schemas from './schemas';
import settings from './settings';
import users from './users';
import session from './session';
import tabs from './tabs';

var stores = {
  colors,
  schemaEntries,
  elements,
  fonts,
  media,
  pages,
  schemas,
  settings,
  users,
  session,
  tabs
};

export {
  colors,
  schemaEntries,
  elements,
  fonts,
  media,
  pages,
  schemas,
  settings,
  users,
  session,
  tabs
};

export default function initStore (data) {
  forEach(stores, (store, key) => {
    if (data[key]) {
      store.data = data[key];
    }
  });
}
