import React from 'react';
import {Route} from 'react-router';

import gaSend from '../helpers/ga-send';
import Init from '../../containers/admin/init';
import Login from '../../components/admin/login';

export default [
  <Route path='/admin/init' component={Init} onEnter={gaSend} />,
  <Route path='/admin/login' component={Login} onEnter={gaSend} />
];
