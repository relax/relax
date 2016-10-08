import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import settingType from '../../types/setting';
import SettingModel from '../../../models/setting';

export default {
  type: settingType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, params, options) => {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return SettingModel
      .findById(params.id)
      .select(projection)
      .lean()
      .exec();
  }
};
