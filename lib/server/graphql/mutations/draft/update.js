import {
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import draftInputType from '../../types/draft-input';
import draftType from '../../types/draft';
import DraftModel from '../../../models/draft';

export default {
  type: draftType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(draftInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.data._id._id);
    const _userId = new Types.ObjectId(params.data._id._userId);

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
