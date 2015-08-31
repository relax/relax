import {ServerStore} from 'relax-framework';
import SchemaModel from '../models/schema';
import Q from 'q';
import mongoose from 'mongoose';

class SchemasStore extends ServerStore {
  constructor () {
    super();
    this.Model = SchemaModel;
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }

  remove (id) {
    return Q()
      .then(() => Q.ninvoke(SchemaModel, 'findByIdAndRemove', id))
      .then((schema) => {
        var schemaJson = schema.toJSON();
        return Q.all([
          schemaJson,
          mongoose.connection.collections[schemaJson.slug] ? Q.ninvoke(mongoose.connection.collections[schemaJson.slug], 'drop') : false
        ]);
      })
      .spread((schema, result) => {
        return schema;
      })
      .catch((error) => {
        throw new Error('Error removing schema ' + error);
      });
  }
}

export default new SchemasStore();
