import Admin from 'screens/admin';
import Pages from 'screens/admin/screens/pages';
import React from 'react';
import {Route} from 'react-router';

export default [
  <Route path='/admin' component={Admin}>
    <Route path='pages' component={Pages}/>
  </Route>
];
