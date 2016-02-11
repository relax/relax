import {
  GraphQLNonNull
} from 'graphql';
import getProjection from 'helpers/get-projection';

import authorize from '../../authorize';
import schemaInputType from '../../types/schema-input';
import schemaType from '../../types/schema';
import RevisionModel from '../../../models/revision';
import SchemaModel from '../../../models/schema';

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

    const schema = await SchemaModel.findById(params.data._id);

    const revision = new RevisionModel({
      _id: {
        _id: schema._id,
        __v: schema.__v
      },
      date: schema.updatedDate,
      user: schema.updatedBy,
      doc: schema
    });

    await revision.save();

    const schemaChanges = Object.assign({}, params.data, {
      __v: schema.__v + 1,
      updatedDate: new Date()
    });

    if (params.data.data && typeof params.data.data === 'string') {
      schemaChanges.data = JSON.parse(params.data.data);
    }
    if (params.data.properties && typeof params.data.properties === 'string') {
      schemaChanges.properties = JSON.parse(params.data.properties);
    }

    const resultSchema = await SchemaModel.findByIdAndUpdate(
      params.data._id,
      schemaChanges,
      {upsert: true, new: true}
    ).select(projection).exec();

    if (!resultSchema) {
      throw new Error('Error updating schema');
    }
    return resultSchema;
  }
};
