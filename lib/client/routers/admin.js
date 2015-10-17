import Cortex from 'backbone-cortex';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import React, {render} from 'react';
// import {render} from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from '../helpers/configure-store';
import adminRoutes from '../../routers/admin';
import Admin from '../../containers/admin';

const cortex = new Cortex();
const store = configureStore();

function renderComponent (Component, route, params) {
  render(
    <Provider store={store}>
      {() => <Component {...merge(route.data, params)} />}
    </Provider>,
    document.getElementById('view')
  );
}

forEach(adminRoutes, (routeInfo) => {
  cortex.route(routeInfo.path, (route, next) => {
    routeInfo.callback(renderComponent.bind(null, Admin, route), {
      query: route.query,
      params: route.params,
      locals: route.data
    }, next);
  });
});

export default {
  routes: cortex.getRoutes()
};
