import Cortex from 'backbone-cortex';
import {Router} from 'relax-framework';
import Page from '../../components/page';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import publicRoutes from '../../routers/public';

var cortex = new Cortex();

function renderComponent (Component, route, params) {
  Router.prototype.renderComponent(Component, merge(route.data, params));
}

cortex.use((route, next) => {
  window.ga && window.ga('send', 'pageview');
  next();
});

forEach(publicRoutes, (routeInfo) => {
  cortex.route(routeInfo.path, (route, next) => {
    routeInfo.callback(renderComponent.bind(this, Page, route), {
      query: route.query,
      params: route.params,
      locals: route.data
    }, next);
  });
});

export default {
  routes: cortex.getRoutes()
};
