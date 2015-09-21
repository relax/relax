import Cortex from 'backbone-cortex';
import Admin from '../../components/admin';
import Q from 'q';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import {Router} from 'relax-framework';

import stores from '../stores';
import sessionStore from '../stores/session';
import tabsStore from '../stores/tabs';

import adminRoutes from '../../routers/admin';

var cortex = new Cortex();

function renderComponent (Component, route, params) {
  Router.prototype.renderComponent(Component, merge(route.data, params));
}

cortex.use((route, next) => {
  Q()
    .then(() => sessionStore.getSession())
    .then((user) => {
      route.data.user = user;
      route.data.tabs = [];

      tabsStore
        .findAll({
          user: user._id
        })
        .then((tabs) => {
          route.data.tabs = tabs;
        })
        .fin(next);
    })
    .catch((err) => {
      window.location.href = '/admin/login';
    });
});

forEach(adminRoutes, (routeInfo) => {
  cortex.route(routeInfo.path, (route, next) => {
    routeInfo.callback(stores, renderComponent.bind(this, Admin, route), {
      query: route.query,
      params: route.params,
      locals: route.data
    }, next);
  });
});

export default {
  routes: cortex.getRoutes()
};
