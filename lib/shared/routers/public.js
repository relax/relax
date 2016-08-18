import Page from 'screens/public/screens/page';
import Public from 'screens/public';
import React from 'react';
import SchemaEntry from 'screens/public/screens/schema-entry';
import {Route, IndexRoute} from 'react-router';

export default [
  <Route name='publicRoot' path='/' component={Public}>
    <IndexRoute
      name='homepage'
      component={Page}
    />
    <Route
      name='schemaEntry'
      path=':schemaSlug/:slug'
      component={SchemaEntry}
    />
    <Route
      name='page'
      path=':slug'
      component={Page}
    />
  </Route>
];
