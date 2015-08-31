import {Collection} from 'relax-framework';
import SettingModel from '../models/setting';

export default Collection.extend({
  model: SettingModel,
  url: function () {
    const ids = this.options.ids;
    var url = '/api/setting';

    if (ids) {
      url += '?ids=' + JSON.stringify(ids);
    }

    return url;
  }
});
