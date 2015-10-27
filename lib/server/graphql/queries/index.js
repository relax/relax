import colors from './colors';
import draft from './draft';
import mediaCount from './media-count';
import menus from './menus';
import menusCount from './menus-count';
import pages from './pages';
import pagesCount from './pages-count';
import schemas from './schemas';
import schemasCount from './schemas-count';
import session from './session';
import settings from './settings';
import user from './user';
import users from './users';
import usersCount from './users-count';
import media, {mediaItem} from './media';
import menu, {validateMenuSlug} from './menu';
import page, {validatePageSlug} from './page';

export default {
  settings,
  page,
  pages,
  pagesCount,
  draft,
  schemas,
  schemasCount,
  session,
  colors,
  media,
  mediaItem,
  mediaCount,
  menu,
  menus,
  menusCount,
  user,
  users,
  usersCount,
  validateMenuSlug,
  validatePageSlug
};
