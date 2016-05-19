import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import draftInputType from '../../types/draft-input';
import draftType from '../../types/draft';
import DraftModel from '../../../models/draft';

export default {
  type: draftType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(draftInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const data = Object.assign({}, params.data, {
      data: JSON.parse(params.data.data),
      actions: JSON.parse(params.data.actions)
    });
    delete data._id;

    const draft = DraftModel
      .findByIdAndUpdate(
        params.id,
        data,
        {upsert: true, new: true}
      )
      .select(projection);

    if (!draft) {
      throw new Error('Draft not found');
    }
    return draft;
  }
};
