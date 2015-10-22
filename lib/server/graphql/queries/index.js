import colors from './colors';
import draft from './draft';
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
  menu,
  menus,
  menusCount,
  user,
  users,
  usersCount,
  validateMenuSlug,
  validatePageSlug
};
