import {Collection} from 'relax-framework';
import TabModel from '../models/tab';

export default Collection.extend({
  model: TabModel,
  url: function () {
    var url = '/api/tab';

    if (typeof this.options !== 'undefined' && this.options.user) {
      url += '/'+this.options.user;
    }

    return url;
  }
});
