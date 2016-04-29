import request from 'superagent';
import Admin from 'screens/admin';
import AnalyticsSettings from 'screens/admin/screens/settings/screens/analytics';
import Colors from 'screens/admin/screens/colors';
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
import Schema from 'screens/admin/screens/schemas/screens/schema';
import SchemaMenu from 'screens/admin/screens/schemas/screens/schema/menu';
import SchemasNew from 'screens/admin/screens/schemas/screens/new';
import SettingsMenu from 'screens/admin/screens/settings/menu';
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
  <Route name='admin' path='/admin' component={Admin} onEnter={authenticate}>
    <Route name='adminSettings' path='settings' menu={SettingsMenu} onEnter={authenticate}>
      <IndexRoute name='adminGeneralSettings' component={GeneralSettings} onEnter={authenticate} />
      <Route name='adminEmailSettings' path='email' component={EmailSettings} onEnter={authenticate} />
      <Route name='adminAnalyticsSettings' path='analytics' component={AnalyticsSettings} onEnter={authenticate} />
      <Route name='adminDataSettings' path='data' component={DataSettings} onEnter={authenticate} />
    </Route>
    <Route name='adminPages' path='pages' component={Pages} menu={PagesMenu} onEnter={authenticate}>
      <Route name='adminPage' path=':id' component={Page} onEnter={authenticate} />
    </Route>
    <Route name='adminMenus' path='menus' component={Menus} menu={MenusMenu} onEnter={authenticate}>
      <Route name='adminMenu' path=':id' component={Menu} onEnter={authenticate} />
    </Route>
    <Route name='adminSchemas' path='schemas'>
      <Route name='adminSchemasNew' path='new' component={SchemasNew} onEnter={authenticate} />
      <Route name='adminSchema' path=':id' component={Schema} menu={SchemaMenu} onEnter={authenticate} />
    </Route>
    <Route name='adminMedia' path='media' component={Media} menu={MediaMenu} onEnter={authenticate} />
    <Route name='adminColors' path='colors' component={Colors} onEnter={authenticate} />
    <Route name='adminUsers' path='users' component={Users} onEnter={authenticate} />
    <Route name='adminFonts' path='fonts' component={Fonts} onEnter={authenticate} />
  </Route>
];
