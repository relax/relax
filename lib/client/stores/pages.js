import {ClientStore} from 'relax-framework';
import PagesCollection from '../collections/pages';
import pageActions from '../actions/page';
import $ from 'jquery';
import Q from 'q';
import tabsStore from './tabs';

class PagesStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(pageActions, 'add', this.add);
      this.listenTo(pageActions, 'remove', this.remove);
      this.listenTo(pageActions, 'validateSlug', this.validateSlug);
      this.listenTo(pageActions, 'update', this.update);
    }
  }

  createCollection () {
    var collection = new PagesCollection();

    collection.on('remove', this.onRemove.bind(this));

    return collection;
  }

  onRemove () {
    tabsStore.fetchCollection();
  }

  validateSlug(slug, deferred) {
    return Q()
      .then(() => {
        $
          .get('/api/page/slug/'+slug)
          .done((response) => {
            deferred.resolve(response.count > 0);
          })
          .fail((error) => {
            deferred.reject(error);
          });
      });
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }
}

export default new PagesStore();
