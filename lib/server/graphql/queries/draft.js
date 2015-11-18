import {
  GraphQLID
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import draftType from '../types/draft';
import DraftModel from '../../models/draft';
import PageModel from '../../models/page';

export default {
  type: draftType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = root.user._id;

    let result = await DraftModel.findById({_id, _userId}).select(projection).exec();

    if (!result) {
      const page = await PageModel.findById(_id).exec();
      const draft = new DraftModel({
        _id: {
          _id,
          _userId
        },
        __v: page.__v,
        data: page.data
      });
      result = await draft.save();
    }

    return result;
  }
};
