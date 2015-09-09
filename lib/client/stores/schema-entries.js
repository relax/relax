import {ClientStore} from 'relax-framework';
import SchemaEntriesCollection from '../collections/schema-entries';
import schemaEntriesActionsFactory from '../actions/schema-entries';
import $ from 'jquery';
import Q from 'q';

class SchemaEntriesStore extends ClientStore {
  constructor (slug) {
    super({
      slug,
      schemaEntriesActions: schemaEntriesActionsFactory(slug)
    });
    this.slug = slug;
  }

  init () {
    if (this.isClient()) {
      this.listenTo(this.options.schemaEntriesActions, 'add', this.add);
      this.listenTo(this.options.schemaEntriesActions, 'remove', this.remove);
      this.listenTo(this.options.schemaEntriesActions, 'validateSlug', this.validateSlug);
      this.listenTo(this.options.schemaEntriesActions, 'update', this.update);
    }
  }

  createCollection () {
    return new SchemaEntriesCollection([], {
      slug: this.slug
    });
  }

  validateSlug (slug, deferred) {
    return Q()
      .then(() => {
        $
          .get('/api/schema-entry/'+this.slug+'/slug/'+slug)
          .done((response) => {
            deferred.resolve(response.count > 0);
          })
          .fail((error) => {
            deferred.error(error);
          });
      });
  }

  findBySlug (_slug) {
    return this.findOne({_slug});
  }
}

var schemaEntriesStores = {};
export default (slug) => {
  if (schemaEntriesStores[slug]) {
    return schemaEntriesStores[slug];
  } else {
    var store = new SchemaEntriesStore(slug);
    schemaEntriesStores[slug] = store;
    return store;
  }
};
