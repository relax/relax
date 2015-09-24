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
      this.listenTo(schemaActions, 'restore', this.restore);
    }
  }

  createCollection () {
    return new SchemasCollection();
  }

  restore (revisionId, deferred) {
    var model = this.getCollection({fetch: false}).get(revisionId._id);

    if (model) {
      return Q()
        .then(() => {
          $
            .get('/api/schema/restore/'+revisionId._id+'/'+revisionId.__v)
            .done((schema) => {
              model.set(schema);
              deferred.resolve(model.toJSON());
              return model;
            })
            .fail((error) => {
              this.collection.trigger('error', error);
              deferred.reject(error);
            });
        });
    } else {
      this.collection.trigger('error', 'Schema not found');
      deferred.reject('Schema not found');
    }
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
