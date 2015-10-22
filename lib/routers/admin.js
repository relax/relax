import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Admin from '../containers/admin';
import Colors from '../containers/admin/colors';
import Fonts from '../containers/admin/fonts';
import Menu from '../containers/admin/menu';
import Menus from '../containers/admin/menus';
import Page from '../containers/admin/page';
import Pages from '../containers/admin/pages';
import PageBuild from '../containers/admin/page-build';
import Schemas from '../containers/admin/schemas';
import Schema from '../containers/admin/schema';
import Settings from '../containers/admin/settings';
import UserEdit from '../containers/admin/user-edit';
import Users from '../containers/admin/users';

export default [
  <Route path='/admin' component={Admin}>
    <IndexRoute component={Settings} />
    <Route path='pages' component={Pages} />
    <Route path='pages/:slug' component={Page} />
    <Route path='page/:id' component={PageBuild} />
    <Route path='schemas' component={Schemas} />
    <Route path='schemas/:slug' component={Schema} />
    <Route path='menus' component={Menus} />
    <Route path='menus/:slug' component={Menu} />
    <Route path='fonts' component={Fonts} />
    <Route path='colors' component={Colors} />
    <Route path='users' component={Users} />
    <Route path='users/:username' component={UserEdit} />
  </Route>
];
