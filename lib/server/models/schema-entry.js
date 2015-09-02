import mongoose from 'mongoose';
import forEach from 'lodash.foreach';
import {TypesNative} from '../../data-types';

var models = {};

export default (schema) => {
  if(models[schema.slug]){
    return models[schema.slug];
  }
  else {
    var mongooseSchema = {
      title: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    };

    forEach(schema.properties, (property) => {
      if(TypesNative[property.type]){
        let native = TypesNative[property.type];

        mongooseSchema[property.id] = {
          type: native,
          required: property.isRequired
        };
      }
    });

    var model = mongoose.model(schema.slug, new mongoose.Schema(mongooseSchema, { collection: schema.slug }));

    models[schema.slug] = model;
    return model;
  }
};
