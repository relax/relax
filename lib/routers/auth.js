import React from 'react';
import {Route} from 'react-router';

import gaSend from '../client/helpers/ga-send';
import Init from '../containers/admin/init';
import Login from '../containers/admin/login';

export default [
  <Route>
    <Route path='/admin/init' component={Init} onEnter={gaSend} />
    <Route path='/admin/login' component={Login} onEnter={gaSend} />
  </Route>
];
