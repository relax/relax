import {Collection} from 'relax-framework';
import MediaModel from '../models/media';
import Utils from '../../utils';

export default Collection.extend({
  model: MediaModel,
  url: function () {
    var url = '/api/media';

    if (this.options) {
      url = Utils.parseQueryUrl(url, this.options);
    }

    return url;
  }
});
