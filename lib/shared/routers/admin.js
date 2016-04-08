import Admin from 'screens/admin';
import Colors from 'screens/admin/screens/colors';
import Fonts from 'screens/admin/screens/fonts';
import Media from 'screens/admin/screens/media';
import MediaMenu from 'screens/admin/screens/media/menu';
import Menu from 'screens/admin/screens/menus/screens/menu';
import Menus from 'screens/admin/screens/menus';
import MenusMenu from 'screens/admin/screens/menus/menu';
import Page from 'screens/admin/screens/pages/screens/page';
import Pages from 'screens/admin/screens/pages';
import PagesMenu from 'screens/admin/screens/pages/menu';
import React from 'react';
import Schema from 'screens/admin/screens/schemas/screens/schema';
import SchemaMenu from 'screens/admin/screens/schemas/screens/schema/menu';
import SchemasNew from 'screens/admin/screens/schemas/screens/new';
import Users from 'screens/admin/screens/users';
import {Route} from 'react-router';

export default [
  <Route name='admin' path='/admin' component={Admin}>
    <Route name='adminPages' path='pages' component={Pages} menu={PagesMenu}>
      <Route name='adminPage' path=':id' component={Page} />
    </Route>
    <Route name='adminMenus' path='menus' component={Menus} menu={MenusMenu}>
      <Route name='adminMenu' path=':id' component={Menu} />
    </Route>
    <Route name='adminSchemas' path='schemas'>
      <Route name='adminSchemasNew' path='new' component={SchemasNew} />
      <Route name='adminSchema' path=':id' component={Schema} menu={SchemaMenu} />
    </Route>
    <Route name='adminMedia' path='media' component={Media} menu={MediaMenu} />
    <Route name='adminColors' path='colors' component={Colors} />
    <Route name='adminUsers' path='users' component={Users} />
    <Route name='adminFonts' path='fonts' component={Fonts} />
  </Route>
];
