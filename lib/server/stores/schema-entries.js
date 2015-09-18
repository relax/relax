import {ServerStore} from 'relax-framework';
import schemaEntriesModelFactory from '../models/schema-entry';
import schemasStore from './schemas';
import revisionsStore from './revisions';
import Q from 'q';
import forEach from 'lodash.foreach';

class SchemaEntriesStore extends ServerStore {
  constructor (schema) {
    super();
    this.Model = schemaEntriesModelFactory(schema);
  }

  getDefaultQueryOptions () {
    return {
      populate: '_createdBy _updatedBy'
    };
  }

  update (_id, data, options = {}) {
    return this
      .findById(_id)
      .then((entry) => {
        return Q.all([entry, revisionsStore.add({
            _id: {
              _id,
              _version: entry._version
            },
            date: entry._updatedDate,
            user: entry._updatedBy,
            doc: entry
          })
        ]);
      })
      .spread((entry, revision) => {
        data._version = entry._version + 1;
        data._updatedDate = new Date();
        return super.update(_id, data, options);
      });
  }

  findBySlug (_slug) {
    return this.findOne({_slug});
  }
}


var schemaEntriesStores = {};
var factory = function (slug) {
  if (schemaEntriesStores[slug]) {
    return Q().then(() => schemaEntriesStores[slug]);
  } else {
    return Q()
      .then(() => schemasStore.findBySlug(slug))
      .then((schema) => {
        var store = new SchemaEntriesStore(schema);
        schemaEntriesStores[slug] = store;
        return store;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

schemasStore
  .findAll()
  .then((schemas) => {
    forEach(schemas, (schema) => {
      var store = new SchemaEntriesStore(schema);
      schemaEntriesStores[schema.slug] = store;
    });
  });

export default factory;
