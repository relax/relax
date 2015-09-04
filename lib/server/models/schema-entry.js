import mongoose from 'mongoose';
import forEach from 'lodash.foreach';
import {TypesNative} from '../../data-types';

var models = {};

export default (schema) => {
  if (models[schema.slug]) {
    return models[schema.slug];
  }
  else {
    var mongooseSchema = {
      _title: {
        type: String,
        required: true
      },
      _slug: {
        type: String,
        required: true,
        unique: true
      },
      _date: {
        type: Date,
        default: Date.now
      },
      _data: {
        type: Array
      },
      _state: {
        type: String,
        default: 'draft'
      },
      _publishedDate: {
        type: Date,
        default: Date.now
      }
    };

    forEach(schema.properties, (property) => {
      if (TypesNative[property.type]) {
        let native = TypesNative[property.type];

        mongooseSchema[property.id] = {
          type: native,
          required: property.required
        };
      }
    });

    var model = mongoose.model(schema.slug, new mongoose.Schema(mongooseSchema, { collection: schema.slug }));

    models[schema.slug] = model;
    return model;
  }
};
