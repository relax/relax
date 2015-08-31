import mongoose from 'mongoose';
import forEach from 'lodash.foreach';
import {TypesNative} from '../../types';

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

    forEach(schema.fields, (field) => {
      if(TypesNative[field.type]){
        let native = TypesNative[field.type];

        mongooseSchema[field.id] = {
          type: native,
          required: field.isRequired
        };
      }
    });

    var model = mongoose.model(schema.slug, new mongoose.Schema(mongooseSchema, { collection: schema.slug }));

    models[schema.slug] = model;
    return model;
  }
};
