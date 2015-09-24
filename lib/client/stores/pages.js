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
      this.listenTo(pageActions, 'restore', this.restore);
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

  restore (revisionId, deferred) {
    var model = this.getCollection({fetch: false}).get(revisionId._id);

    if (model) {
      return Q()
        .then(() => {
          $
            .get('/api/page/restore/'+revisionId._id+'/'+revisionId.__v)
            .done((page) => {
              model.set(page);
              deferred.resolve(model.toJSON());
              return model;
            })
            .fail((error) => {
              this.collection.trigger('error', error);
              deferred.reject(error);
            });
        });
    } else {
      this.collection.trigger('error', 'Page not found');
      deferred.reject('Page not found');
    }
  }

  validateSlug (slug, deferred) {
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
