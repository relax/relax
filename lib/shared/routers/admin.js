import request from 'superagent';
import Admin from 'screens/admin';
import AnalyticsSettings from 'screens/admin/screens/settings/screens/analytics';
import Colors from 'screens/admin/screens/colors';
import DataSchema from 'screens/admin/screens/schemas/screens/data';
import DataSchemaNew from 'screens/admin/screens/schemas/screens/data/screens/new';
import DataSettings from 'screens/admin/screens/settings/screens/data';
import EmailSettings from 'screens/admin/screens/settings/screens/email';
import Fonts from 'screens/admin/screens/fonts';
import GeneralSettings from 'screens/admin/screens/settings/screens/general';
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
import SchemaMenu from 'screens/admin/screens/schemas/screens/single/menu';
import SchemasNew from 'screens/admin/screens/schemas/screens/new';
import SettingsMenu from 'screens/admin/screens/settings/menu';
import Template from 'screens/admin/screens/templates/screens/template';
import Templates from 'screens/admin/screens/templates';
import TemplatesMenu from 'screens/admin/screens/templates/menu';
import User from 'screens/admin/screens/users/screens/user';
import Users from 'screens/admin/screens/users';
import {Route, IndexRoute} from 'react-router';

function authenticate (nextState, replaceState, callback) {
  if (typeof window !== 'undefined') {
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
    callback();
  }
}

export default [
  <Route name='admin' path='/admin' component={Admin}>
    <IndexRoute onEnter={authenticate} />
    <Route name='adminSettings' path='settings' component={GeneralSettings} menu={SettingsMenu}>
      <IndexRoute name='adminGeneralSettings' onEnter={authenticate} />
      <Route name='adminEmailSettings' path='email' component={EmailSettings} onEnter={authenticate} />
      <Route name='adminAnalyticsSettings' path='analytics' component={AnalyticsSettings} onEnter={authenticate} />
      <Route name='adminDataSettings' path='data' component={DataSettings} onEnter={authenticate} />
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
      </Route>
      <Route name='adminDataSchema' path='data/:id'>
        <IndexRoute component={DataSchema} onEnter={authenticate} />
        <Route name='adminDataSchemaNew' path='new' component={DataSchemaNew} />
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
