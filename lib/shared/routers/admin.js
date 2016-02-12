import Admin from 'screens/admin';
import Colors from 'screens/admin/screens/colors';
import Pages from 'screens/admin/screens/pages';
import PagesMenu from 'screens/admin/screens/pages/menu';
import React from 'react';
import Users from 'screens/admin/screens/users';
import {Route} from 'react-router';

export default [
  <Route name='admin' path='/admin' component={Admin}>
    <Route name='adminPages' path='pages' component={Pages} menu={PagesMenu} />
    <Route name='adminColors' path='colors' component={Colors} />
    <Route name='adminUsers' path='users' component={Users} />
  </Route>
];
