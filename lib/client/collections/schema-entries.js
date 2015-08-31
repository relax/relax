import {Collection} from 'relax-framework';
import SchemaEntryModel from '../models/schema-entry';
import Utils from '../../utils';

export default Collection.extend({
  model: SchemaEntryModel,
  initialize: function(models, options) {
    this.slug = options.slug;
    delete options.slug;
  },
  url: function () {
    var url = '/api/schema-entry/' + this.slug;

    if (this.options) {
      url = Utils.parseQueryUrl(url, this.options);
    }

    return url;
  }
});
