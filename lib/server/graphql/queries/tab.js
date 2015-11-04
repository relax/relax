import Q from 'q';
import {
  GraphQLString,
  GraphQLID
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import tabType from '../types/tab';
import TabModel from '../../models/tab';

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

    return TabModel
      .findById({_id, _userId})
      .select(projection)
      .then((tabResult) => {
        if (!tabResult) {
          const tab = new TabModel({
            _id: {
              _id,
              _userId
            },
            [params.type]: _id
          });
          return Q()
            .then(() => tab.save())
            .then((createdTab) => {
              if (!createdTab) {
                throw new Error('Error creating tab');
              }
              return createdTab;
            });
        }
        return tabResult;
      });
  }
};
