import find from 'lodash.find';
import forEach from 'lodash.foreach';
import getProjection from 'helpers/get-projection';
import singleStatics from 'statics/schema-single-static-properties';
import {GraphQLNonNull} from 'graphql';

import SchemaModel from '../../../models/schema';
import authorize from '../../authorize';
import cleanModelRefs from '../_helpers/clean-model-refs';
import schemaInputType from '../../types/schema-input';
import schemaType from '../../types/schema';
import schemaEntryModel, {removeModel} from '../../../models/schema-entry';

async function singleDummyFill (Model, userId) {
  let counter = 0;

  return new Promise((resolve, reject) => {
    Model
      .find({})
      .cursor()
      .on('data', (doc) => {
        forEach(singleStatics, (s, prop) => {
          let value = s.default;

          if (prop === 'data') {
            value = {};
          }

          if (!value) {
            if (s.ref === 'User') {
              value = userId;
            } else if (prop === 'title') {
              value = `Entry ${counter}`;
            } else if (prop === 'slug') {
              value = `entry-${counter}`;
            }
          }

          if (value) {
            doc.set(prop, typeof value === 'function' ? value() : value);
          }
        });

        doc.save();
        counter ++;
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve();
      });
  });
}

async function renameProperty (Model, oldName, newName) {
  return new Promise((resolve, reject) => {
    Model.collection.update(
      {},
      {
        $rename: {
          [oldName]: newName
        }
      },
      {multi: true},
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
}

export default {
  type: schemaType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(schemaInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const {data} = params;
    const schemaId = data._id;

    if (!schemaId) {
      throw new Error('Missing schema id');
    }

    // get schema
    const schema = await SchemaModel
      .findById(schemaId)
      .lean()
      .exec();

    if (!schema) {
      throw new Error('Could not find schema');
    }

    // Get schema entries model
    let Model = await schemaEntryModel(schemaId);

    if (!Model) {
      throw new Error('Schema model was not compiled');
    }

    // possible unset properties
    const unset = {};

    // calculate if model needs to be recompiled
    let needsRecompile =
      schema.type !== data.type ||
      schema.properties.length !== data.properties.length;

    // check if any prop has changed
    for (const property of schema.properties) {
      const editingProperty = find(data.properties, {_id: property._id.toString()});
      const path = `properties.${property.id}`;

      if (!editingProperty) {
        unset[path] = true;
        needsRecompile = true;
      } else {
        const idChanged = property.id !== editingProperty.id;
        const typeChanged = property.type !== editingProperty.type;
        const requiredChanged = property.required !== editingProperty.required;
        const defaultChanged = property.default !== editingProperty.default;

        if (idChanged || typeChanged || requiredChanged || defaultChanged) {
          // something changed in this property
          needsRecompile = true;

          if (idChanged) {
            const newPath = `properties.${editingProperty.id}`;
            await renameProperty(Model, path, newPath);
          }
        }
      }
    }

    if (needsRecompile) {
      // remove the model
      removeModel(schemaId);
    }

    // update schema
    const resultSchema = await SchemaModel
      .findByIdAndUpdate(
        schemaId,
        data,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec();

    if (!resultSchema) {
      throw new Error('Error updating schema');
    }

    if (needsRecompile) {
      // let recompile the model
      Model = await schemaEntryModel(schemaId);

      if (!Model) {
        throw new Error('Error recompiling the model');
      }
    }

    if (schema.type !== data.type) {
      if (data.type === 'data') {
        // changed from single -> data

        // remove slug index
        Model.collection.dropIndex({slug: 1});

        // drop single references
        await cleanModelRefs(schemaId);

        // stage single static properties for unset
        forEach(singleStatics, (s, prop) => {
          unset[prop] = true;
        });
      } else {
        // changed from data -> single
        await singleDummyFill(Model, root.user._id);
      }
    }

    // removed properties no longer used
    if (Object.keys(unset).length) {
      await Model
        .update({},
          {$unset: unset},
          {multi: true, safe: true, strict: false}
        )
        .exec();
    }

    return resultSchema;
  }
};
