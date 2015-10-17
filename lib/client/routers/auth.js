import Cortex from 'backbone-cortex';
import React, {render} from 'react';
import {Provider} from 'react-redux';

import configureStore from '../helpers/configure-store';
import Init from '../../containers/admin/init';
import Login from '../../components/admin/login';

const cortex = new Cortex();
const store = configureStore();

cortex.use((route, next) => {
  window.ga && window.ga('send', 'pageview');
  next();
});

cortex.route('admin/init', (route, next) => {
  render(
    <Provider store={store}>
      {() => <Init />}
    </Provider>,
    document.getElementById('view')
  );
});

cortex.route('admin/login', (route, next) => {
  render(<Login />, document.getElementById('view'));
});

export default {
  routes: cortex.getRoutes()
};
