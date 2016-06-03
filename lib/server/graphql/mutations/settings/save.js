import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import settingInputType from '../../types/setting-input';
import settingType from '../../types/setting';
import SettingModel from '../../../models/setting';

function saveOne (setting, projection) {
  return SettingModel
    .findByIdAndUpdate(setting._id, setting, {upsert: true, new: true})
    .select(projection);
}

export const saveSetting = {
  type: settingType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(settingInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return saveOne(params.data, projection);
  }
};

export const saveSettings = {
  type: new GraphQLList(settingType),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(
        new GraphQLList(settingInputType)
      )
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const result = [];

    for (const setting of params.data) {
      result.push(await saveOne(setting, projection));
    }

    return result;
  }
};
