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

  update (id, data) {
    return Q()
      .then(() => this.findById(id))
      .then((schema) => {
        if (schema.slug !== data.slug && data.slug !== '' && mongoose.connection.collections[schema.slug]) {
          return Q()
            .then(() => Q.ninvoke(mongoose.connection.collections[schema.slug], 'rename', data.slug))
            .then(() => super.update(id, data));
        } else {
          return super.update(id, data);
        }
      })
      .catch((error) => {
        throw new Error('Error updating schema ' + error);
      });
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
