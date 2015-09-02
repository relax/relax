import {ClientStore} from 'relax-framework';
import SchemaEntriesCollection from '../collections/schema-entries';
import schemaEntriesActionsFactory from '../actions/schema-entries';
import $ from 'jquery';
import Q from 'q';

class SchemaEntriesStore extends ClientStore {
  constructor (slug) {
    this.slug = slug;
    this.schemaEntriesActions = schemaEntriesActionsFactory(slug);
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(this.schemaEntriesActions, 'add', this.add);
      this.listenTo(this.schemaEntriesActions, 'remove', this.remove);
      this.listenTo(this.schemaEntriesActions, 'validateSlug', this.validateSlug);
      this.listenTo(this.schemaEntriesActions, 'update', this.update);
    }
  }

  createCollection () {
    return new SchemaEntriesCollection([], {
      slug: this.slug
    });
  }

  validateSlug (slug) {
    return Q()
      .then(() => {
        var deferred = Q.defer();

        $
          .get('/api/schema-entry/'+this.slug+'/slug/'+slug)
          .done((response) => {
            deferred.resolve(response.count > 0);
          })
          .fail((error) => {
            deferred.error(error);
          });

        return deferred.promise;
      });
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }
}

var schemaEntriesStores = {};
export default (slug) => {
  if(schemaEntriesStores[slug]){
    return schemaEntriesStores[slug];
  } else {
    var store = new SchemaEntriesStore(slug);
    schemaEntriesStores[slug] = store;
    return store;
  }
};
