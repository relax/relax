import Admin from 'screens/admin';
import Colors from 'screens/admin/screens/colors';
import Fonts from 'screens/admin/screens/fonts';
import Menus from 'screens/admin/screens/menus';
import MenusMenu from 'screens/admin/screens/menus/menu';
import Pages from 'screens/admin/screens/pages';
import PagesMenu from 'screens/admin/screens/pages/menu';
import React from 'react';
import Users from 'screens/admin/screens/users';
import {Route} from 'react-router';

export default [
  <Route name='admin' path='/admin' component={Admin}>
    <Route name='adminPages' path='pages' component={Pages} menu={PagesMenu} />
    <Route name='adminMenus' path='menus' component={Menus} menu={MenusMenu} />
    <Route name='adminColors' path='colors' component={Colors} />
    <Route name='adminUsers' path='users' component={Users} />
    <Route name='adminFonts' path='fonts' component={Fonts} />
  </Route>
];
