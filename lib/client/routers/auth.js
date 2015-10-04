import Cortex from 'backbone-cortex';
import {Router} from 'relax-framework';

import Init from '../../components/admin/init';
import Login from '../../components/admin/login';

var cortex = new Cortex();
var renderComponent = Router.prototype.renderComponent.bind(Router.prototype);

cortex.use((route, next) => {
  window.ga && window.ga('send', 'pageview');
  next();
});

cortex.route('admin/init', (route, next) => {
  renderComponent(Init, {});
});

cortex.route('admin/login', (route, next) => {
  renderComponent(Login, {});
});

export default {
  routes: cortex.getRoutes()
};
