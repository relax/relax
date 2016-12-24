import getProjection from 'helpers/get-projection';
import {
  GraphQLList,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import settingType from '../../types/setting';
import SettingModel from '../../../models/setting';

export default {
  type: new GraphQLList(settingType),
  args: {
    ids: {
      name: 'ids',
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (root, params, options) => {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return SettingModel
      .find({
        _id: {$in: params.ids}
      })
      .select(projection)
      .exec();
  }
};
