import {Collection} from 'relax-framework';
import DraftModel from '../models/draft';
import Utils from '../../utils';

export default Collection.extend({
  model: DraftModel,
  url: function () {
    var url = '/api/draft';
    
    if (this.options) {
      url = Utils.parseQueryUrl(url, this.options);
    }

    return url;
  }
});
