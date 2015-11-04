import colors from './colors';
import draft from './draft';
import mediaCount from './media-count';
import menus from './menus';
import menusCount from './menus-count';
import pages from './pages';
import pagesCount from './pages-count';
import revisions from './revisions';
import schemaList from './schema-list';
import schemaListCount from './schema-list-count';
import schemas from './schemas';
import schemasCount from './schemas-count';
import session from './session';
import settings from './settings';
import styles from './styles';
import tab from './tab';
import tabs from './tabs';
import user from './user';
import users from './users';
import usersCount from './users-count';
import media, {mediaItem} from './media';
import menu, {validateMenuSlug} from './menu';
import page, {validatePageSlug} from './page';
import schema, {validateSchemaSlug} from './schema';
import schemaEntry, {validateSchemaEntrySlug} from './schema-entry';

export default {
  settings,
  page,
  pages,
  pagesCount,
  revisions,
  schemaEntry,
  schemaList,
  schemaListCount,
  draft,
  schema,
  schemas,
  schemasCount,
  session,
  styles,
  colors,
  media,
  mediaItem,
  mediaCount,
  menu,
  menus,
  menusCount,
  tab,
  tabs,
  user,
  users,
  usersCount,
  validateMenuSlug,
  validatePageSlug,
  validateSchemaSlug,
  validateSchemaEntrySlug
};
