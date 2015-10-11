import Cortex from 'backbone-cortex';
import Admin from '../../components/admin';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import {Router} from 'relax-framework';
import configureStore from '../helpers/configure-store';
import adminRoutes from '../../routers/admin';

const cortex = new Cortex();
const store = configureStore();

function renderComponent (Component, route, params) {
  Router.prototype.renderComponent(Component, merge(route.data, params, {store}));
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
