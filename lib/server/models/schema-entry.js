import mongoose from 'mongoose';
import forEach from 'lodash.foreach';
import {TypesNative} from '../../data-types';
import tabsStore from '../stores/tabs';
import revisionsStore from '../stores/revisions';

var models = {};

export default (schema) => {
  if (models[schema.slug]) {
    return models[schema.slug];
  }
  else {
    var mongooseSchema = {
      _version: {
        type: Number,
        required: true,
        default: 1
      },
      _title: {
        type: String,
        required: true
      },
      _slug: {
        type: String,
        required: true,
        unique: true
      },
      _state: {
        type: String,
        default: 'draft'
      },
      _date: {
        type: Date,
        default: Date.now
      },
      _publishedDate: {
        type: Date,
        default: Date.now
      },
      _updatedDate: {
        type: Date,
        default: Date.now
      },
      _data: {
        type: Array
      },
      _createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      _updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

    let entrySchema = new mongoose.Schema(mongooseSchema, { collection: schema.slug });

    entrySchema.post('remove', (schemaEntry) => {
      tabsStore.removeMultiple({
        pageId: schemaEntry._id
      });
      revisionsStore.removeMultiple({
        '_id._id': schemaEntry._id
      });
    });

    var model = mongoose.model(schema.slug, entrySchema);

    models[schema.slug] = model;
    return model;
  }
};
