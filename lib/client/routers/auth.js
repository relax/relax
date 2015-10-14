import Cortex from 'backbone-cortex';
import React, {render} from 'react';

import Init from '../../components/admin/init';
import Login from '../../components/admin/login';

var cortex = new Cortex();

cortex.use((route, next) => {
  window.ga && window.ga('send', 'pageview');
  next();
});

cortex.route('admin/init', (route, next) => {
  render(<Init />, document.getElementById('view'));
});

cortex.route('admin/login', (route, next) => {
  render(<Login />, document.getElementById('view'));
});

export default {
  routes: cortex.getRoutes()
};
