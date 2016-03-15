import forEach from 'lodash.foreach';
import getProjection from 'helpers/get-projection';
import Q from 'q';
import {
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import settingInputType from '../../types/setting-input';
import settingType from '../../types/setting';
import SettingModel from '../../../models/setting';

export default {
  type: new GraphQLList(settingType),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(
        new GraphQLList(settingInputType)
      )
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const promises = [];

    forEach(params.data, (setting) => {
      promises.push(
        SettingModel.findByIdAndUpdate(setting._id, setting, {upsert: true, new: true}).select(projection)
      );
    });

    return Q
      .all(promises)
      .spread((...settings) => settings);
  }
};
