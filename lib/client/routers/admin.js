import Cortex from 'backbone-cortex';
import Admin from '../../components/admin';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import {Router} from 'relax-framework';

import adminRoutes from '../../routers/admin';

var cortex = new Cortex();

function renderComponent (Component, route, params) {
  Router.prototype.renderComponent(Component, merge(route.data, params));
}

forEach(adminRoutes, (routeInfo) => {
  cortex.route(routeInfo.path, (route, next) => {
    routeInfo.callback(renderComponent.bind(this, Admin, route), {
      query: route.query,
      params: route.params,
      locals: route.data
    }, next);
  });
});

export default {
  routes: cortex.getRoutes()
};
