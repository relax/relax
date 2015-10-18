import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Admin from '../../containers/admin';
import Colors from '../../containers/admin/colors';
import Menu from '../../components/admin/panels/menu';
import Menus from '../../containers/admin/menus';
import Page from '../../containers/admin/page';
import Pages from '../../containers/admin/pages';
import Settings from '../../containers/admin/settings';
import Users from '../../containers/admin/users';
import UserEdit from '../../containers/admin/user-edit';

export default [
  <Route path='/admin' component={Admin}>
    <IndexRoute component={Settings} />
    <Route path='colors' component={Colors} />
    <Route path='menus' component={Menus} />
    <Route path='menus/:slug' component={Menu} />
    <Route path='pages' component={Pages} />
    <Route path='pages/:slug' component={Page} />
    <Route path='users' component={Users} />
    <Route path='users/:username' component={UserEdit} />
  </Route>
];
