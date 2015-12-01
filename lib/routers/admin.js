import React from 'react';
import {Route, IndexRoute} from 'react-router';

import gaSend from '../client/helpers/ga-send';
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
    <IndexRoute component={Settings} onEnter={gaSend} />
    <Route path='pages' component={Pages} onEnter={gaSend} />
    <Route path='pages/:id' component={Page} onEnter={gaSend} />
    <Route path='page/:id' component={PageBuild} onEnter={gaSend} />
    <Route path='schemas' component={Schemas} onEnter={gaSend} />
    <Route path='schemas/:id' component={Schema} onEnter={gaSend} />
    <Route path='schema/:id' component={SchemaList} onEnter={gaSend} />
    <Route path='schema/:id/:entryId' component={SchemaEntry} onEnter={gaSend} />
    <Route path='media' component={MediaManager} onEnter={gaSend} />
    <Route path='menus' component={Menus} onEnter={gaSend} />
    <Route path='menus/:id' component={Menu} onEnter={gaSend} />
    <Route path='fonts' component={Fonts} onEnter={gaSend} />
    <Route path='colors' component={Colors} onEnter={gaSend} />
    <Route path='users' component={Users} onEnter={gaSend} />
    <Route path='users/:username' component={UserEdit} onEnter={gaSend} />
  </Route>
];
