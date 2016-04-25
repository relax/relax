import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {Types} from 'mongoose';

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
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = root.user._id;

    const data = Object.assign({}, params.data, {
      data: JSON.parse(params.data.data),
      actions: JSON.parse(params.data.actions)
    });
    delete data._id;

    return DraftModel
      .findByIdAndUpdate(
        {_id, _userId},
        data,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec()
      .then((resultDraft) => {
        if (!resultDraft) {
          throw new Error('Draft not found');
        }
        return resultDraft;
      });
  }
};
