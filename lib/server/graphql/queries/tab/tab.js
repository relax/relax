import getProjection from 'helpers/get-projection';
import {GraphQLString, GraphQLID} from 'graphql';
import {Types} from 'mongoose';

import authorize from '../../authorize';
import tabType from '../../types/tab';
import TabModel from '../../../models/tab';

export default {
  type: tabType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    },
    type: {
      name: 'type',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = root.user._id;

    const tab = TabModel.findById({_id, _userId}).select(projection).exec();

    let tabResult;
    if (!tab) {
      const tabModel = new TabModel({
        _id: {
          _id,
          _userId
        },
        [params.type]: _id
      });

      tabResult = await tabModel.save();

      if (!tabResult) {
        throw new Error('Error creating tab');
      }
    } else {
      tabResult = tab;
    }

    return tabResult;
  }
};
