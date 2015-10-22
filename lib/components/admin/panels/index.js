import Colors from '../../../containers/admin/colors';
import Fonts from './fonts';
import Menu from '../../../containers/admin/menu';
import Menus from '../../../containers/admin/menus';
import Page from '../../../containers/admin/page';
import PageBuild from '../../../containers/admin/page-build';
import Pages from '../../../containers/admin/pages';
import Schema from './schema';
import Schemas from './schemas';
import Settings from '../../../containers/admin/settings';
import UserEdit from '../../../containers/admin/user-edit';
import Users from '../../../containers/admin/users';
// import Media from './media';
// import SchemaList from './schema-list';
// import SchemaEntry from './schema-entry';

export default {
  settings: Settings,
  pages: Pages,
  page: Page,
  pageBuild: PageBuild,
  fonts: Fonts,
  // media: Media,
  menu: Menu,
  menus: Menus,
  colors: Colors,
  schemas: Schemas,
  schema: Schema,
  // schemaList: SchemaList,
  // schemaEntry: SchemaEntry,
  users: Users,
  userEdit: UserEdit
};
