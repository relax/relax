import {ServerStore} from 'relax-framework';
import SchemaModel from '../models/schema';
import Q from 'q';
import mongoose from 'mongoose';
import revisionsStore from './revisions';

class SchemasStore extends ServerStore {
  constructor () {
    super();
    this.Model = SchemaModel;
  }

  getDefaultQueryOptions () {
    return {
      populate: 'createdBy updatedBy'
    };
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }

  update (_id, data, options = {}) {
    let schema;
    return this.findById(_id)
      .then((_schema) => {
        schema = _schema;
        let value;

        if (schema.slug !== data.slug && data.slug !== '' && mongoose.connection.collections[schema.slug]) {
          value = Q.ninvoke(mongoose.connection.collections[schema.slug], 'rename', data.slug);
        } else {
          value = Q();
        }

        return value;
      })
      .then(() => {
        return revisionsStore.add({
          _id: {
            _id,
            __v: schema.__v
          },
          date: schema.updatedDate,
          user: schema.updatedBy,
          doc: schema
        });
      })
      .then(() => {
        data.__v = schema.__v + 1;
        data.updatedDate = new Date();
        return super.update(_id, data, options);
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
