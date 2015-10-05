import {ClientStore} from 'relax-framework';
import MenusCollection from '../collections/menus';
import menuActions from '../actions/menu';
import $ from 'jquery';
import Q from 'q';

class MenusStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(menuActions, 'add', this.add);
      this.listenTo(menuActions, 'remove', this.remove);
      this.listenTo(menuActions, 'validateSlug', this.validateSlug);
      this.listenTo(menuActions, 'update', this.update);
    }
  }

  count (_deferred) {
    var deferred = _deferred || Q.defer();

    $
      .get('/api/menu/count')
      .done((response) => {
        deferred.resolve(response.count);
      })
      .fail((error) => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  createCollection () {
    return new MenusCollection();
  }

  validateSlug (slug, deferred) {
    return Q()
      .then(() => {
        $
          .get('/api/menu/slug/'+slug)
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

export default new MenusStore();
