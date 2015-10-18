import React from 'react';
import {Route} from 'react-router';

import gaSend from '../helpers/ga-send';
import Init from '../../containers/admin/init';
import Login from '../../containers/admin/login';

export default [
  <Route onEnter={gaSend}>
    <Route path='/admin/init' component={Init} />
    <Route path='/admin/login' component={Login} />
  </Route>
];
