import forEach from 'lodash.foreach';
import mongoose from 'mongoose';

import SchemaModel from './schema';
import {TypesNative} from '../../data-types/native';

// import tabsStore from '../stores/tabs';
// import revisionsStore from '../stores/revisions';

const models = {};
export default async (schemaId) => {
  if (models[schemaId]) {
    return models[schemaId];
  }

  const schema = await SchemaModel.findById(schemaId).exec();

  const properties = {};
  forEach(schema.properties, (property) => {
    if (TypesNative[property.type]) {
      const native = TypesNative[property.type];
      properties[property.id] = {
        type: native,
        required: property.required
      };
    }
  });

  const mongooseSchema = {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    state: {
      type: String,
      default: 'draft'
    },
    date: {
      type: Date,
      default: Date.now
    },
    publishedDate: {
      type: Date,
      default: Date.now
    },
    updatedDate: {
      type: Date,
      default: Date.now
    },
    data: {
      type: Array
    },
    schemaLinks: {
      type: mongoose.Schema.Types.Mixed
    },
    overlap: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    properties
  };

  const entrySchema = new mongoose.Schema(mongooseSchema, { collection: schema.slug });

  // entrySchema.post('remove', (schemaEntry) => {
  //   tabsStore.removeMultiple({
  //     '_id._id': schemaEntry._id
  //   });
  //   revisionsStore.removeMultiple({
  //     '_id._id': schemaEntry._id
  //   });
  // });

  const model = mongoose.model(schema.slug, entrySchema);
  models[schemaId] = model;
  return model;
};
