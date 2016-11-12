import {isArray, isString} from 'lodash';
import SettingModel from '../../server/models/setting';
import parseSettings from 'helpers/parse-settings';

const EMPTY_OBJECT = {};

export default async function getSettings (settingsIds) {
  if (isArray(settingsIds) || isString(settingsIds)) {
    const ids = isArray(settingsIds) ? settingsIds : [settingsIds];
    const settingsArr = await SettingModel
      .find({
        _id: {
          $in: ids
        }
      })
      .exec();
    const settings = parseSettings(settingsArr);
    return settings;
  }
  return EMPTY_OBJECT;
}
