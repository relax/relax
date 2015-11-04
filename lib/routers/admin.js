import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Admin from '../containers/admin';
import Colors from '../containers/admin/colors';
import Fonts from '../containers/admin/fonts';
import MediaManager from '../containers/admin/media-manager';
import Menu from '../containers/admin/menu';
import Menus from '../containers/admin/menus';
import Page from '../containers/admin/page';
import PageBuild from '../containers/admin/page-build';
import Pages from '../containers/admin/pages';
import Schema from '../containers/admin/schema';
import SchemaEntry from '../containers/admin/schema-entry';
import SchemaList from '../containers/admin/schema-list';
import Schemas from '../containers/admin/schemas';
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
    <Route path='schema/:id' component={SchemaList} />
    <Route path='schema/:id/:entryId' component={SchemaEntry} />
    <Route path='media' component={MediaManager} />
    <Route path='menus' component={Menus} />
    <Route path='menus/:slug' component={Menu} />
    <Route path='fonts' component={Fonts} />
    <Route path='colors' component={Colors} />
    <Route path='users' component={Users} />
    <Route path='users/:username' component={UserEdit} />
  </Route>
];
