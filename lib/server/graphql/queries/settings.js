import {
  GraphQLList,
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import settingType from '../types/setting';
import SettingModel from '../../models/setting';

export default {
  type: new GraphQLList(settingType),
  args: {
    ids: {
      name: 'ids',
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);

    return SettingModel
      .find({
        _id: {$in: params.ids}
      })
      .select(projection)
      .exec();
  }
};
