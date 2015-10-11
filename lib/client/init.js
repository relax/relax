import $ from 'jquery';
import Backbone from 'backbone';
Backbone.$ = $;

export default function init (Router) {
  new Router();
  Backbone.history.start({pushState: true});
}
