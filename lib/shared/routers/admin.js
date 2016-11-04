import Admin from 'screens/admin';
import AnalyticsSettings from 'screens/admin/screens/settings/screens/analytics';
import Colors from 'screens/admin/screens/colors';
import DataSchema from 'screens/admin/screens/schemas/screens/data';
import DataSchemaEntry from 'screens/admin/screens/schemas/screens/data/screens/edit';
import DataSchemaNew from 'screens/admin/screens/schemas/screens/data/screens/new';
import Fonts from 'screens/admin/screens/fonts';
import GeneralSettings from 'screens/admin/screens/settings/screens/general';
import GoogleSettings from 'screens/admin/screens/settings/screens/google';
import Media from 'screens/admin/screens/media';
import MediaMenu from 'screens/admin/screens/media/menu';
import Menu from 'screens/admin/screens/menus/screens/menu';
import Menus from 'screens/admin/screens/menus';
import MenusMenu from 'screens/admin/screens/menus/menu';
import Page from 'screens/admin/screens/pages/screens/page';
import Pages from 'screens/admin/screens/pages';
import PagesMenu from 'screens/admin/screens/pages/menu';
import React from 'react';
import Schema from 'screens/admin/screens/schemas/screens/single';
import SchemaEdit from 'screens/admin/screens/schemas/screens/edit';
import SchemaMenu from 'screens/admin/screens/schemas/screens/single/menu';
import SchemasNew from 'screens/admin/screens/schemas/screens/new';
import SettingsMenu from 'screens/admin/screens/settings/menu';
import SingleEntry from 'screens/admin/screens/schemas/screens/single/screens/entry';
import Template from 'screens/admin/screens/templates/screens/template';
import Templates from 'screens/admin/screens/templates';
import TemplatesMenu from 'screens/admin/screens/templates/menu';
import User from 'screens/admin/screens/users/screens/user';
import Users from 'screens/admin/screens/users';
import request from 'superagent';
import {IndexRoute, Route} from 'react-router';

let firstEntry = true;

function authenticate (nextState, replaceState, callback) {
  if (typeof window !== 'undefined' && !firstEntry) {
    request
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: 'query { session }'
      })
      .end((error, result) => {
        if (error || !result.body.data.session) {
          window.location.href = '/admin/login';
        } else {
          callback();
        }
      });
  } else {
    firstEntry = false;
    callback();
  }
}

export default [
  <Route name='admin' path='/admin' component={Admin}>
    <IndexRoute onEnter={authenticate} />
    <Route name='adminSettings' path='settings' menu={SettingsMenu}>
      <IndexRoute name='adminGeneralSettings' component={GeneralSettings} onEnter={authenticate} />
      <Route name='adminGoogleSettings' path='google' component={GoogleSettings} onEnter={authenticate} />
      <Route name='adminAnalyticsSettings' path='analytics' component={AnalyticsSettings} onEnter={authenticate} />
    </Route>
    <Route name='adminPages' path='pages' component={Pages} menu={PagesMenu}>
      <IndexRoute onEnter={authenticate} />
      <Route name='adminPage' path=':id' component={Page} onEnter={authenticate} />
    </Route>
    <Route name='adminTemplates' path='templates' component={Templates} menu={TemplatesMenu}>
      <IndexRoute onEnter={authenticate} />
      <Route name='adminTemplate' path=':id' component={Template} onEnter={authenticate} />
    </Route>
    <Route name='adminMenus' path='menus' component={Menus} menu={MenusMenu}>
      <IndexRoute onEnter={authenticate} />
      <Route name='adminMenu' path=':id' component={Menu} onEnter={authenticate} />
    </Route>
    <Route name='adminSchemas' path='schemas'>
      <Route name='adminSchemasNew' path='new' component={SchemasNew} onEnter={authenticate} />
      <Route name='adminSingleSchema' path='single/:id' component={Schema} menu={SchemaMenu}>
        <IndexRoute onEnter={authenticate} />
        <Route name='adminSingleSchemaEntry' path=':entryId' component={SingleEntry} onEnter={authenticate} />
      </Route>
      <Route name='adminDataSchema' path='data/:id'>
        <IndexRoute component={DataSchema} onEnter={authenticate} />
        <Route name='adminDataSchemaEdit' path='edit' component={SchemaEdit} />
        <Route name='adminDataSchemaNew' path='new' component={DataSchemaNew} />
        <Route name='adminDataSchemaEntry' path=':entryId' component={DataSchemaEntry} />
      </Route>
    </Route>
    <Route name='adminMedia' path='media' component={Media} menu={MediaMenu} onEnter={authenticate} />
    <Route name='adminColors' path='colors' component={Colors} onEnter={authenticate} />
    <Route name='adminUsers' path='users'>
      <IndexRoute component={Users} onEnter={authenticate} />
      <Route path=':id' component={User} onEnter={authenticate} />
    </Route>
    <Route name='adminFonts' path='fonts' component={Fonts} onEnter={authenticate} />
  </Route>
];
