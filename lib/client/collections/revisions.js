import {Collection} from 'relax-framework';
import RevisionModel from '../models/revision';
import Utils from '../../utils';

export default Collection.extend({
  model: RevisionModel,
  url: function () {
    var url = '/api/revision';

    if (this.options) {
      url = Utils.parseQueryUrl(url, this.options);
    }

    return url;
  }
});
