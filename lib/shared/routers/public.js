import Page from 'screens/public/screens/page';
import Public from 'screens/public';
import React from 'react';
import SchemaEntry from 'screens/public/screens/schema-entry';
import {Route, IndexRoute} from 'react-router';
import request from 'helpers/request';

function initialized (nextState, replaceState, callback) {
  if (typeof window !== 'undefined') {
    request({
      query: 'query { usersCount }'
    })
    .then((result) => {
      if (!result.data.usersCount) {
        window.location.href = '/admin/init';
      } else {
        callback();
      }
    })
    .catch(() => {
      callback();
    });
  } else {
    callback();
  }
}

export default [
  <Route name='publicRoot' path='/' component={Public}>
    <IndexRoute
      name='homepage'
      component={Page}
      onEnter={initialized}
    />
    <Route
      name='schemaEntry'
      path=':schemaSlug/:slug'
      component={SchemaEntry}
      onEnter={initialized}
    />
    <Route
      name='page'
      path=':slug'
      component={Page}
      onEnter={initialized}
    />
  </Route>
];
