import {ClientStore} from 'relax-framework';
import SchemasCollection from '../collections/schemas';
import schemaActions from '../actions/schema';
import $ from 'jquery';
import Q from 'q';

class SchemasStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(schemaActions, 'add', this.add);
      this.listenTo(schemaActions, 'remove', this.remove);
      this.listenTo(schemaActions, 'validateSlug', this.validateSlug);
      this.listenTo(schemaActions, 'update', this.update);
    }
  }

  createCollection () {
    return new SchemasCollection();
  }

  validateSlug(slug, deferred) {
    return Q()
      .then(() => {
        $
          .get('/api/schema/slug/'+slug)
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

export default new SchemasStore();
