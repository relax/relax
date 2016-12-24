import gaSend from 'helpers/ga-send';
import Auth from 'screens/auth';
import Init from 'screens/auth/screens/init';
import Login from 'screens/auth/screens/login';
import React from 'react';
import {Route} from 'react-router';

export default [
  <Route component={Auth}>
    <Route path='/admin/init' component={Init} onEnter={gaSend} />
    <Route path='/admin/login' component={Login} onEnter={gaSend} />
  </Route>
];
