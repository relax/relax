import {
  GraphQLString
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
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = root.user._id;

    return DraftModel
      .findById({_id, _userId})
      .select(projection)
      .then((draftResult) => {
        console.log(draftResult);
        if (!draftResult) {
          return PageModel
            .findById(_id)
            .then((page) => {
              console.log(page);
              const draft = new DraftModel({
                _id: {
                  _id,
                  _userId
                },
                __v: page.__v,
                data: page.data
              });

              return draft.save();
            })
            .then((createdDraft) => {
              return createdDraft;
            })
            .catch((err) => {
              return err;
            });
        }
        return draftResult;
      });
  }
};
