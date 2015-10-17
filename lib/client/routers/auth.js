import React from 'react';
import {Route} from 'react-router';

import Init from '../../containers/admin/init';
import Login from '../../components/admin/login';

// const cortex = new Cortex();
//
// cortex.use((route, next) => {
//   window.ga && window.ga('send', 'pageview');
//   next();
// });

export default [
  <Route path='/admin/init' component={Init} />,
  <Route path='/admin/login' component={Login} />
];
