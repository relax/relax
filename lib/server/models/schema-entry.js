import forEach from 'lodash.foreach';
import mongoose from 'mongoose';
import {TypesNative} from 'helpers/data-types/native';

import SchemaModel from './schema';

// import tabsStore from '../stores/tabs';
// import revisionsStore from '../stores/revisions';

const models = {};
const modelsPromises = {};
const COLLECTION_PREFIX = 'uc_';

function createSchemaModel (schemaId) {
  return new Promise(async (resolve, reject) => {
    const schema = await SchemaModel.findById(schemaId).exec();

    if (!schema) {
      reject(new Error('Schema not found'));
    }

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

    let mongooseSchema = {};

    if (schema.type === 'single') {
      mongooseSchema = {
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
          type: mongoose.Schema.Types.Mixed,
          default: {}
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        properties,
        template: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Template'
        }
      };
    } else {
      mongooseSchema = {
        properties
      };
    }

    const entrySchema = new mongoose.Schema(mongooseSchema, {collection: `${COLLECTION_PREFIX}${schema.slug}`});

    // entrySchema.post('remove', (schemaEntry) => {
    //   tabsStore.removeMultiple({
    //     '_id._id': schemaEntry._id
    //   });
    //   revisionsStore.removeMultiple({
    //     '_id._id': schemaEntry._id
    //   });
    // });

    const model = mongoose.model(schema.slug, entrySchema);

    resolve(model);
    return model;
  });
}

export default async (schemaId) => {
  if (models[schemaId]) {
    return models[schemaId];
  }

  modelsPromises[schemaId] = modelsPromises[schemaId] || createSchemaModel(schemaId);
  models[schemaId] = await modelsPromises[schemaId];

  delete modelsPromises[schemaId];

  return models[schemaId];
};
