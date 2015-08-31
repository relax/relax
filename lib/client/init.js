import $ from 'jquery';
import Backbone from 'backbone';
Backbone.$ = $;

import initStores from './stores';

export default function init (Router) {
  window.initialProps = $('script[type="application/json"]').html();

  if (window.initialProps) {
    window.initialProps = JSON.parse(window.initialProps);
  }

  initStores(window.initialProps);

  /* jshint ignore:start */
  new Router();
  /* jshint ignore:end */

  Backbone.history.start({pushState: true});
}
