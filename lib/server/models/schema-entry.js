import forEach from 'lodash/forEach';
import mongoose from 'mongoose';
import singleStatics from 'statics/schema-single-static-properties';
import {TypesNative} from 'statics/data-types/native';

import SchemaModel from './schema';

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
        schemaId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        ...singleStatics,
        properties
      };
    } else {
      mongooseSchema = {
        schemaId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        properties
      };
    }

    const entrySchema = new mongoose.Schema(mongooseSchema, {collection: `${COLLECTION_PREFIX}${schemaId}`});
    const model = mongoose.model(schemaId, entrySchema);

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

export function removeModel (schemaId) {
  delete models[schemaId];
  delete mongoose.models[schemaId];
  delete mongoose.modelSchemas[schemaId];
}
